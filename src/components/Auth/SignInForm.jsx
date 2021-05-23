import React from 'react';
import styles from './Auth.module.css';
import {change, reset, Field, reduxForm, formValueSelector} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {requiredFields, maxLengthCreator, } from '../../utils/validators.js';
import {Input, Button, ErrorForm} from '../commons/FormsControls/FormsControls.jsx';
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle.jsx';

const accounts = [
  {
    email: 'alina.lukianenko@gmail.com',
    password: 'Password96',
  }, 
  {
    email: 'viktoriya.dyachenko@gmail.com',
    password: 'Password96',
  },
];

const maxLength30 = maxLengthCreator(30);

class SignInForm extends React.Component {

  constructor (props) {
    super(props);
  }

  state = {
    shown: false,
  }

  componentDidMount () {
    setTimeout(() => {
      if(!this.props.auth.is_auth) {
        alert('Нажмите на поле ввода адреса почты и выберите один из предложенных вариантов')
      }
    }, 1000);
  }

  componentWillUpdate (nextProps) {
    if(nextProps.email != this.props.email || nextProps.password != this.props.password) {
      const acc = accounts.find(acc => acc.email === nextProps.email);
      if(acc) this.props.change('password', acc.password);
    }
  }

  render () {
    const {handleSubmit} = this.props;

    return <div>
      <form className={styles.items_container} onSubmit={handleSubmit}>
        {
          this.props.auth.is_fetching 
            && <div>
            <div className={styles['fetching-wrp']}>
        <div className={styles['fetching']}>
          <FetchingToggle width={50} height={50}/>
        </div>
      </div>
    </div>
        || this.props.server_error && <ErrorForm message={this.props.server_error} /> 
        || <div> </div>
        }
        <div>
          <Field name='email' autoFocus={true} 
            reference={this.emailInput}
            validate={[requiredFields, maxLength30]}
            component={Input} 
            onActive='true'
            list='defaultEmails'
            placeholder=' Enter your email' />
          <datalist id="defaultEmails">
            {accounts.map(acc => <option value={acc.email} />)}
          </datalist>

        </div>
        <div>
          <Field name='password' component={Input} 
            type='password'
            validate={[requiredFields, maxLength30, ]} 
            reference={this.state.emailInput}
            placeholder=' Enter your password' />
        </div>
        <div className={styles.button_wrapper} >
          <div>
          </div>
          <Button error={this.props.error} name={'Sign In'} type='submit' 
            disabled={this.props.auth.is_fetching}/>
        </div>
        <NavLink to='/signup'>
          Or registration
        </NavLink>
  </form>
                    </div>
  }
};

const selector = formValueSelector('signin');

export default compose(
  connect(
    state => {
      const {email, password} = selector(state, 'email', 'password');
      return {email, password}
    },
  ),
  reduxForm({form: 'signin',
  })
)(SignInForm);
