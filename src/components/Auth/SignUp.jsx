import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import cls from './SignUp.module.css';

const SignUp  = (props) => {

    let first_name_input = React.createRef();
    let last_name_input = React.createRef();
    let email_input = React.createRef();
    let password_input = React.createRef();
    let check_password_input = React.createRef();

    let onSignUp = () => {
        let data = {
            first_name: first_name_input.current.value,
            last_name: last_name_input.current.value,
            email: email_input.current.value,
            password: password_input.current.value,
        };

        fetch('http://127.0.0.1:8080/auth', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        });
    };

    debugger;
    return (
        <div className={cls.wrapper_container}>
            <div className={cls.items_container} >
                <h3>{'Authorization'}</h3>
                <input placeholder='enter your first name' ref={first_name_input} />
                <input placeholder='enter your last name' ref={last_name_input} />
                <input placeholder='enter your email' ref={email_input} />
                <input placeholder='enter password' ref={password_input} />
                <input placeholder='check your password' ref={check_password_input} />
                <div className={cls.sign_up_button} >
                    <button onClick={onSignUp}>
                        {'Sign up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapsStateToProps = (state) => {
    return {
    };
};

const mapsDispatchToProps = {

};

export default connect(mapsStateToProps, mapsDispatchToProps)(SignUp);
