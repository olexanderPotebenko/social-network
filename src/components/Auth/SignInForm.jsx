import React from 'react';
import styles from './Auth.module.css';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {requiredFields, maxLengthCreator, } from '../../utils/validators.js';
import {Input, Button, ErrorForm} from '../commons/FormsControls/FormsControls.jsx';
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle.jsx';
import {loadPassword as loadAccount} from '../../reducers/account.js';

const accounts = [
  {
    email: 'alina.lukianenko@gmail.com',
    password: '111111',
  }, 
  {
    email: 'viktoriya.dyachenko@gmail.com',
    password: '111111',
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
    setTimeout(() => 
      alert('Нажмите на поле ввода адреса почты и выберите один из предложенных вариантов'), 1000);
  }

  componentWillUpdate (nextProps) {
    if(nextProps.email != this.props.email) {
      debugger;
      this.props.load(accounts, nextProps.email);
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
            validate={[requiredFields, maxLength30, ]} 
            type='password'
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
    state => ({
      initialValues: state.account.data,
      email: selector(state, 'email'),
      password: selector(state, 'password'),
    }),
    {load: loadAccount}
  ),
  reduxForm({form: 'signin'})
)(SignInForm);
