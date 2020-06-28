import React from 'react';
import {Field,Fields, reduxForm} from 'redux-form';
import {requiredFields, matchPasswords, minLengthCreator, maxLengthCreator, emailValidate} from '../../utils/validators.js';
import {Input} from '../commons/FormsControls/FormsControls.jsx';
import cls from './SignIn.module.css';

const maxLength20 = maxLengthCreator(20);
const maxLength30 = maxLengthCreator(30);
const maxLength50 = maxLengthCreator(50);
const minLength6 = minLengthCreator(6);

const SignUpForm = (props) => {

    const {handleSubmit} = props;

    return <div> 
        <form onSubmit={handleSubmit} className={cls.items_container} >
            <div>
            <Field name='first_name' validate={[requiredFields, 
                    maxLength20]}
                component={Input}
                placeholder='Enter your first name' />
            </div>
            <div>
            <Field name='last_name' validate={[requiredFields, 
                    maxLength20]}
                component={Input}
                placeholder='Enter your last name' />
            </div>
            <div>
            <Field name='email' validate={[requiredFields, emailValidate, 
                    maxLength50, minLength6]}
                component={Input}
                placeholder='Enter your email' />
            </div>
            <div>
                <Field name='password' validate={[requiredFields, 
                    maxLength20, minLength6]}
                component={Input}
                placeholder='Create your password' />
            </div>
            <div>
                <Field name='check_password' 
                    validate={[requiredFields, matchPasswords ]}
                component={Input}
                placeholder='Enter password again' />
            </div>
            <div> 
                <span>{props.error}</span>
            </div>
            <div> 
                <button className={cls.sign_up_button}>Sign Up</button>
            </div>
        </form>
    </div>
};

export default reduxForm({form: 'signup'})(SignUpForm);
