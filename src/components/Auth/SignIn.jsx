import React from 'react';
import {compose} from 'redux';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {login, setServerErrorActionCreator} from '../../reducers/authReducer.js';
import SignInForm from './SignInForm.jsx';
import cls from './Auth.module.css';

class SignIn extends React.Component {

  componentDidMount(){
    //this.props.login({email: 'alina.lukianenko@gmail.com', password: '111111'})
  }
  componentWillUnmount(){
    this.props.setServerError(undefined);
  }

  onSubmit = (form_data) => {
    this.props.login(form_data)
  };

  render() {
    if(this.props.auth.is_auth && !!~this.props.location.pathname.indexOf('signin')) {
      //this.props.history.push(`/profile/${this.props.auth.id}/subscribers/`);
      this.props.history.push(`/profile/${this.props.auth.id}/posts/`);
    //this.props.history.push(`/messages/${this.props.auth.id}/`);
    //this.props.history.push(`/users/`);
    }
    return <div className={cls.wrapper_container}>
      <h3>Authorization</h3>
      <SignInForm onSubmit={this.onSubmit} {...this.props}/>
    </div>
  }
};

const mapsStateToProps = (state) => {
  return {
    server_error: state.auth.server_error,
  };
};

const mapsDispatchToProps = {
  login,
  setServerError: setServerErrorActionCreator
};

export default compose(
  connect(mapsStateToProps, mapsDispatchToProps),
  WithAuthData,
)(withRouter(SignIn));

