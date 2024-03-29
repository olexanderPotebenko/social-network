import React from 'react';
import {Field,Fields, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';
import {requiredFields, matchPasswords, minLengthCreator, 
  maxLengthCreator, emailValidate, onlyLetters, complexPassword} from '../../utils/validators.js';
import {nameNor, } from '../../utils/fieldNormalizators.js';
import {Input, Button, ErrorForm, } from '../commons/FormsControls/FormsControls.jsx';
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle.jsx';
import styles from './Auth.module.css';

const maxLength20 = maxLengthCreator(20);
const maxLength30 = maxLengthCreator(30);
const maxLength50 = maxLengthCreator(50);
const minLength6 = minLengthCreator(6);

class SignUpForm extends React.Component {

  render() {
    const {handleSubmit} = this.props;

    return <div> 
      <form onSubmit={handleSubmit} className={styles.items_container} >
        {
          this.props.auth.is_fetching 
            && <div>
            <div className={styles['fetching-wrp']}>
        <div className={styles['fetching']}>
          <FetchingToggle />
        </div>
      </div>
    </div>
        || this.props.server_error && <ErrorForm message={this.props.server_error} /> 
        || <div> </div>
        }
        <div>
          <Field name='first_name' autoFocus={true}
            validate={[requiredFields, maxLength20, onlyLetters]}
            normalize={nameNor}
            component={Input}
            placeholder=' Enter your first name' />
        </div>

        <div>
          <Field name='last_name' 
            validate={[requiredFields, maxLength20, onlyLetters]}
            normalize={nameNor}
            component={Input}
            placeholder=' Enter your last name' />
        </div>
        <div>
          <Field name='email' validate={[requiredFields, emailValidate, 
              maxLength50, minLength6]}
            component={Input}
            placeholder=' Enter your email' />
        </div>
        <div>
          <Field name='password' validate={[requiredFields, 
              maxLength20, minLength6, complexPassword]}
            component={Input}
            type='password'
            placeholder=' Create your password' />
        </div>
        <div>
          <Field name='check password' 
            type='password'
            validate={[requiredFields, matchPasswords ]}
            component={Input}
            placeholder=' Enter password again' />
        </div>
        <div className={styles.button_wrapper}>
          <Button error={this.props.error} name={'Sign Up'} type='submit' 
            disabled={this.props.auth.is_fetching}/>
        </div>
        <NavLink to='/signin'>
          Or authorization
        </NavLink>

    </form>
                                        </div>
  }
};

export default reduxForm({form: 'signup'})(SignUpForm);
