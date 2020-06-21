import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile.jsx';
import {setUserProfileActionCreator} from '../../reducers/profileReducer.js';
import {profileApi} from '../../api/api.js';

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount () {

        let user_id = this.props.match.params.user_id;
        user_id = user_id || '5ee978dad56af10db6e64ba5';

        profileApi.getProfile({user_id}).then(obj => {
            if(obj.data.result_code === 0){
                this.props.setUserProfile(obj.data);
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
