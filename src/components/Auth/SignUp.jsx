import React from 'react';
import {compose} from 'redux';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {authApi} from '../../api/api.js';
import {signUp, setSignUpResultActionCreator} from '../../reducers/authReducer.js';
import SignUpForm from './SignUpForm.jsx';
import cls from './SignIn.module.css';

const SignUp  = (props) => {

    let onSubmit = ({check_password, ...form_data}) => {
        console.log(form_data);
        props.signUp(form_data)
    };

    if(props.auth.success_sign_up){
        props.setSignUpResult(false);
        props.history.push(`/signin`);
    };
    return <div className={cls.wrapper_container}>
        <h3>Sign Up</h3>
        <SignUpForm onSubmit={onSubmit} />
    </div>
};

const mapsStateToProps = (state) => {
    return {
    };
};

const mapsDispatchToProps = {
    signUp,
    setSignUpResult: setSignUpResultActionCreator,
};

export default compose(
    connect(mapsStateToProps, mapsDispatchToProps),
    WithAuthData
)(SignUp);
