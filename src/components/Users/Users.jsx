import React from 'react';
import Filter from './Filter/Filter.jsx';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {getUsers, follow, unfollow, followedActionCreator, unfollowedActionCreator, setUsersActionCreator, setUsersCountActionCreator, setPageCurrentActionCreator, setIsFetchingActionCreator} from '../../reducers/usersReducer.js';
import UserItem from './UserItem/UserItem.jsx';
import PaginationBar from './PaginationBar/PaginationBar.jsx';
import Preloader from '../commons/Preloader/Preloader.jsx';
import styles from './Users.module.css';
import {userApi} from '../../api/api.js';

class Users extends React.Component {
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

        let users = this.props.users.map(item => {

            let isFollowed = () => {
                return item.subscribers.find(user => user.id == this.props.auth.id);
            };

            return <UserItem 
                is_following_fetching={this.props.is_following_fetching}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                auth={this.props.auth}
                followed={isFollowed()}
                user={item} />
        });

        return (
            <div className={'wrp'}>

                <div>
                    <Filter />
                    <PaginationBar />
                </div>

                <div className={'custom_scroll_bar list' }>
                    {
                        !this.props.is_fetching? 
                        users:
                        <Preloader />
                    }
                    </div>
                </div>
        );

    };
};



let mapsStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        page_size: state.usersPage.options.page_size,
        page_current: state.usersPage.options.page_current,
        is_fetching: state.usersPage.options.is_fetching,
        is_following_fetching: state.usersPage.options.is_following_fetching,
        auth: state.auth,
    };
};

let mapsDispatchToProps = {
    getUsers,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(Users);
