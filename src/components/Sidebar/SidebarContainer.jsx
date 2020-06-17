import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar.jsx';
import {setAuthDataActionCreator} from '../../reducers/authReducer.js';

class SidebarContainer extends React.Component {

    componentDidMount() {

    };

    render() {
        return <Sidebar {...this.props} />
    };
};

const mapsStateToProps = (state) => {
    return {
        data: state.auth,
    };
};

const mapsDispatchToProps = {
    setAuthData: setAuthDataActionCreator,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Sidebar);
