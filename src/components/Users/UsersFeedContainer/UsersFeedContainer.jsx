import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import UsersFeed from './UsersFeed/UsersFeed.jsx';
import {followedActionCreator, unfollowedActionCreator, setUsersActionCreator, setUsersCountActionCreator, setPageCurrentActionCreator, setIsFetchingActionCreator} from '../../../reducers/usersReducer.js';
import {userApi} from '../../../api/api.js';

class UsersFeedApiContainer extends React.Component {
    constructor(props) {
        super(props);

    };

    componentDidMount() {
        this.props.setIsFetching(true);

        let options = {
            page_current: this.props.page_current,
            page_size: this.props.page_size,
            id: this.props.auth.id,
            token: this.props.auth.token,
        };
        userApi.getUsers(options)
                    .then(data => {
                this.props.setUsers(data.items);
                this.props.setUsersCount(data.totalCount);
                this.props.setIsFetching(false);
            });
    };

    render () {

        return (
            <UsersFeed
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                users={this.props.users}
                page_count={this.props.total_users_count/this.props.page_size}
                page_current={this.props.page_current}
                setUsers={this.props.setUsers}
                setUsersCount={this.props.setUsersCount}
                setPageCurrent={this.props.setPageCurrent}
                page_size={this.props.page_size}
                total_users_count={this.props.total_users_count}
                is_fetching={this.props.is_fetching}
                setIsFetching={this.props.setIsFetching}
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

let mapsDispatchToProps = (dispatch) => {
    return {
        follow: (user_id) => {
            return dispatch(followedActionCreator(user_id))
        },
        unfollow: (user_id) => dispatch(unfollowedActionCreator(user_id)),
        setUsers: (users) => dispatch(setUsersActionCreator(users)),
        setUsersCount: (total_users_count) => dispatch(setUsersCountActionCreator(total_users_count)),
        setPageCurrent: (page_current) => dispatch(setPageCurrentActionCreator(page_current)),
        setIsFetching: (is_fetching) => dispatch(setIsFetchingActionCreator(is_fetching)),
    };
};

const UsersFeedContainer = connect(mapsStateToProps, mapsDispatchToProps)(UsersFeedApiContainer);

export default UsersFeedContainer;
