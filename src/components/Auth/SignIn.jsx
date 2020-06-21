import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import cls from './SignIn.module.css';
import {setAuthDataActionCreator} from '../../reducers/authReducer.js';
import {authApi} from '../../api/api.js';

const SignIn  = (props) => {

    let email_input = React.createRef();
    let password_input = React.createRef();

    let onSignIn = () => {
        let data = {
            email: email_input.current.value,
            password: password_input.current.value,
        };

        authApi.signIn(data)
        .then( (data) => {
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
                <input placeholder='enter your email' defaultValue='oleg.goncharenko@gmail.com' ref={email_input} />
                <input placeholder='enter password' defaultValue='111111' ref={password_input} />
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
