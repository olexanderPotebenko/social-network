import React from 'react';
import {connect} from 'react-redux';
import Profile from './Profile.jsx';
import {getProfile} from '../../reducers/profileReducer.js';

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount () {

        let user_id = this.props.match.params.user_id;
        user_id = user_id || '5ee978dad56af10db6e64ba5';
        let options = {
            user_id,
            id: this.props.auth? this.props.auth.id: '',
            token: this.props.auth? this.props.auth.id: '',
        };
        this.props.getProfile(options);
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

export default connect(mapsStateToProps, {getProfile})(ProfileContainer);
