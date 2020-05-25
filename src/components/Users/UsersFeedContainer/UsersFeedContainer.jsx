import React from 'react';
import {connect} from 'react-redux';
import UsersFeed from './UsersFeed/UsersFeed.jsx';
import {followedActionCreator, unfollowedActionCreator} from '../../../reducers/usersReducer.js';

let mapsStateToProps = (state) => {
    return {
        state: state.usersPage,
    };
};

let mapsDispatchToProps = (dispatch) => {
    return {
        follow: (user_id) => {
            return dispatch(followedActionCreator(user_id))
        },
        unfollow: (user_id) => dispatch(unfollowedActionCreator(user_id))
    };
};

const UsersFeedContainer = connect(mapsStateToProps, mapsDispatchToProps)(UsersFeed);

export default UsersFeedContainer;
