import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import Profile from './Profile.jsx';
import {setUserProfileActionCreator} from '../../reducers/profileReducer.js';

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount () {

        let user_id = this.props.match.params.user_id;
        user_id = user_id || '5ee941cfc6b8a15631284def';

        axios.get(`http://127.0.0.1:8080/profile/${user_id}`).then(obj => {
            if(obj.data.status_code === 0){
                this.props.setUserProfile(obj.data.data);
            };
        });
    }

    render() {

        return <Profile {...this.props} />
    }
}

let mapsStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    };
};

export default connect(mapsStateToProps, {setUserProfile: setUserProfileActionCreator})(ProfileContainer);
