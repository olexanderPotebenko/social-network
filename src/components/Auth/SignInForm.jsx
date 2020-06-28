import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredFields, maxLengthCreator} from '../../utils/validators.js';
import {Input} from '../commons/FormsControls/FormsControls.jsx';
import cls from './SignIn.module.css';

const maxLength30 = maxLengthCreator(30);
const SignInForm = (props) => {
    const {handleSubmit} = props;

    return <div>
        <form className={cls.items_container} onSubmit={handleSubmit}>
        <div>
            <Field name='email' validate={[requiredFields, maxLength30]}
                component={Input} 
                placeholder='Enter your email' />
        </div>
        <div>
            <Field name='password' component={Input} 
                validate={[requiredFields, maxLength30]} 
                placeholder='Enter your password' 
            />
        </div>
        <div>
            <button className={cls.sign_up_button} type='submit' >Submit</button>
        </div>
        <div>
            {props.error && <span>{props.error}</span>}
        </div>
        </form>
    </div>
};

export default reduxForm({form: 'signin'})(SignInForm);
