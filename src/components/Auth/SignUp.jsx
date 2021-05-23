import React from 'react';
import {compose} from 'redux';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {authApi} from '../../api/api.js';
import {signUp, setServerErrorActionCreator} from '../../reducers/authReducer.js';
import SignUpForm from './SignUpForm.jsx';
import cls from './Auth.module.css';

class SignUp extends React.Component {

    componentWillUnmount(){
        this.props.setServerError(undefined);
    }

    render(){
        let onSubmit = ({check_password, ...form_data}) => {
            console.log(form_data);
            this.props.signUp(form_data)
        };

        debugger;
      if(this.props.auth.is_auth && !!~this.props.location.pathname.indexOf('signup')) {
        debugger;
        this.props.history.push(`/profile/${this.props.auth.id}/posts/`);
      };

        return <div className={cls.wrapper_container}>
            <h3>Registration</h3>
            <SignUpForm onSubmit={onSubmit} {...this.props}/>
        </div>
    }
};

const mapsStateToProps = (state) => {
    return {
        server_error: state.auth.server_error,
    };
};

const mapsDispatchToProps = {
    signUp,
    setServerError: setServerErrorActionCreator,
};

export default compose(
    connect(mapsStateToProps, mapsDispatchToProps),
    WithAuthData,
)(withRouter(SignUp));
