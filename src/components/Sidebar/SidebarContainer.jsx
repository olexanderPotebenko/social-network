import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar.jsx';

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
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Sidebar);
