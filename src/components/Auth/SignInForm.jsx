import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {requiredFields, maxLengthCreator, } from '../../utils/validators.js';
import {Input, Button, ErrorForm} from '../commons/FormsControls/FormsControls.jsx';
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle.jsx';
import styles from './Auth.module.css';

const maxLength30 = maxLengthCreator(30);
const SignInForm = (props) => {
    const {handleSubmit} = props;

    return <div>
        <form className={styles.items_container} onSubmit={handleSubmit}>
            {
                props.auth.is_fetching && <FetchingToggle />
                || props.server_error && <ErrorForm message={props.server_error} /> 
                || <div> </div>
            }
                <div>
                    <Field name='email' autoFocus={true} 
                        validate={[requiredFields, maxLength30]}
                        component={Input} 
                        placeholder=' Enter your email' />
                    </div>
                    <div>
                        <Field name='password' component={Input} 
                            validate={[requiredFields, maxLength30, ]} 
                            type='password'
                            placeholder=' Enter your password' />
                        </div>
                        <div className={styles.button_wrapper} >
                            <Button error={props.error} name={'Sign In'} type='submit' 
                                disabled={props.auth.is_fetching}/>
                            </div>
                        </form>
                    </div>
};

export default reduxForm({form: 'signin'})(SignInForm);
