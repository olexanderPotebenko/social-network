import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as axios from 'axios';
import cls from './SignIn.module.css';
import {setAuthDataActionCreator} from '../../reducers/authReducer.js';

const SignIn  = (props) => {

    let email_input = React.createRef();
    let password_input = React.createRef();

    let onSignIn = () => {
        let data = {
            email: email_input.current.value,
            password: password_input.current.value,
        };

        fetch('http://127.0.0.1:8080/signin', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            if(data.status_code === 0){
                props.setAuthData(data.data);
                props.history.push(`/profile/${data.data.id}`);
            };
        }).catch(err => {
            console.log(err)
        });
    };

    return (
        <div className={cls.wrapper_container}>
            <div className={cls.items_container} >
                <h3>{'Authorization'}</h3>
                <input placeholder='enter your email' ref={email_input} />
                <input placeholder='enter password' ref={password_input} />
                <div className={cls.sign_up_button} >
                    <button onClick={onSignIn}>
                        {'Sign in'}
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
    setAuthData: setAuthDataActionCreator,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(withRouter(SignIn));
