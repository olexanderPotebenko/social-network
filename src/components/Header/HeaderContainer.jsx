import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import Header from './Header';
import {setAuthDataActionCreator} from '../../reducers/authReducer.js';

class HeaderContainer extends React.Component {
    componentDidMount() {
    };

    render() {
        return <Header {...this.props} />
    };
};

const mapStateToProps = (state) => {
    return {
        state: state.auth,
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

