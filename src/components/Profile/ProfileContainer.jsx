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
        user_id = user_id || 2;

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${user_id}`).then(obj => {
            this.props.setUserProfile(obj.data);
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
