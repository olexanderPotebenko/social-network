import React from 'react';
import {compose} from 'redux';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import {login} from '../../reducers/authReducer.js';
import SignInForm from './SignInForm.jsx';
import cls from './SignIn.module.css';

const SignIn  = (props) => {

    let onSubmit = (form_data) => {
        console.log(form_data);
        props.login(form_data)
    };

    if(props.auth.is_auth)
        props.history.push(`/profile/${props.auth.id}`);
    return <div className={cls.wrapper_container}>
        <h3>Sign in</h3>
        <SignInForm onSubmit={onSubmit} />
    </div>
};

const mapsStateToProps = (state) => {
    return {
    };
};

const mapsDispatchToProps = {
    login
};

export default compose(
    connect(mapsStateToProps, mapsDispatchToProps),
   WithAuthData 
)(SignIn);

