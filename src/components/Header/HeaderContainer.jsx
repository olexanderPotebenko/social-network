import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import Header from './Header';
import {setAuthDataActionCreator} from '../../reducers/authReducer.js';

class HeaderContainer extends React.Component {
    componentDidMount() {

        axios.get('http://127.0.0.1:8080/auth/me', 
            {})
            .then(res => {
                if(res.data.result_code === 0){
                    debugger;
                    this.props.setAuthData();
                };
            });
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
    setAuthData: setAuthDataActionCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

