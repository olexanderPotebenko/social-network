import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import UsersFeed from './UsersFeed/UsersFeed.jsx';
import {getUsers, follow, unfollow, followedActionCreator, unfollowedActionCreator, setUsersActionCreator, setUsersCountActionCreator, setPageCurrentActionCreator, setIsFetchingActionCreator} from '../../../reducers/usersReducer.js';
import {userApi} from '../../../api/api.js';

class UsersFeedApiContainer extends React.Component {
    constructor(props) {
        super(props);

    };

    componentDidMount() {

        let options = {
            page_current: this.props.page_current,
            page_size: this.props.page_size,
            id: this.props.auth.id,
            token: this.props.auth.token,
        };
        this.props.getUsers(options);
    };

    render () {

        return (
            <UsersFeed
                getUsers={this.props.getUsers}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                users={this.props.users}
                page_count={this.props.total_users_count/this.props.page_size}
                page_current={this.props.page_current}
                page_size={this.props.page_size}
                total_users_count={this.props.total_users_count}
                is_fetching={this.props.is_fetching}
                auth={this.props.auth}
            />
        );
    };
};



let mapsStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        page_size: state.usersPage.options.page_size,
        page_current: state.usersPage.options.page_current,
        total_users_count: state.usersPage.options.total_users_count,
        is_fetching: state.usersPage.options.is_fetching,
        auth: state.auth,
    };
};

let mapsDispatchToProps = {
    follow,
    unfollow,
    getUsers,
};

const UsersFeedContainer = connect(mapsStateToProps, mapsDispatchToProps)(UsersFeedApiContainer);

export default UsersFeedContainer;
