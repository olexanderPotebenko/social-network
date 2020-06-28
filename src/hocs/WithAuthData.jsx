import React from 'react';
import {connect} from 'react-redux';

let WithAuthData = (Component) => {

    class ComponentContainer extends React.Component {
        render() {
            return <Component {...this.props} />;
        };
    };

    let mapsStateToProps = (state) => {
        return {
        auth: state.auth,
        };
    };

    return connect(mapsStateToProps, {})(ComponentContainer);
};

export default WithAuthData;
