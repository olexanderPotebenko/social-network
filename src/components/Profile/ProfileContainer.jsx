import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Profile from './Profile.jsx';
import {getProfile} from '../../reducers/profileReducer.js';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount () {

        let user_id = this.props.match.params.user_id;
        user_id = user_id;
        let options = {
            user_id,
            id: this.props.auth? this.props.auth.id: '',
            token: this.props.auth? this.props.auth.token: '',
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

export default compose(
    connect(mapsStateToProps, {getProfile}),
    WithAuthData,
    WithSignInRedirect
)(ProfileContainer);
