import React from 'react';
import {connect} from 'react-redux';
import UsersFeed from './UsersFeed/UsersFeed.jsx';
import {followedActionCreator, unfollowedActionCreator, setUsersActionCreator, setUsersCountActionCreator, setPageCurrentActionCreator} from '../../../reducers/usersReducer.js';

let mapsStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        page_size: state.usersPage.options.page_size,
        page_current: state.usersPage.options.page_current,
        total_users_count: state.usersPage.options.total_users_count
    };
};

let mapsDispatchToProps = (dispatch) => {
    return {
        follow: (user_id) => {
            return dispatch(followedActionCreator(user_id))
        },
        unfollow: (user_id) => dispatch(unfollowedActionCreator(user_id)),
        setUsers: (users) => dispatch(setUsersActionCreator(users)),
        setUsersCount: (total_users_count) => dispatch(setUsersCountActionCreator(total_users_count)),
        setPageCurrent: (page_current) => dispatch(setPageCurrentActionCreator(page_current))
    };
};

const UsersFeedContainer = connect(mapsStateToProps, mapsDispatchToProps)(UsersFeed);

export default UsersFeedContainer;
