import React from 'react';
import {connect, Redirect} from 'react-router-dom';

let WithSignInRedirect = (Component) => {

    class ComponentContainer extends React.Component {
        render() {
            return this.props.auth && this.props.auth.is_auth === true ? 
                <Component {...this.props} /> :
                <Redirect to={'/signin'} />;
        };
    };

    return ComponentContainer;
};

export default WithSignInRedirect;
