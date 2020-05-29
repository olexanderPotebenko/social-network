import React from 'react';
import UserItem from './UserItem/UserItem.jsx';
import * as axios from 'axios';
import PaginationBar from './PaginationBar/PaginationBar.jsx';

//const UsersFeed = (props) => {
//
//
//    return (
//        <div>
//            {users}
//        </div>
//    );
//};

class UsersFeed extends React.Component {
    constructor(props) {
        super(props);
        
    };

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users/?page=${this.props.page_current}&count=${this.props.page_size}`)
            .then((res) => {
                this.props.setUsers(res.data.items);
                this.props.setUsersCount(res.data.totalCount);
            });
    };

    render () {
        let users = this.props.users.map(item => {
            
            return <UserItem 
            follow={this.props.follow}
            unfollow={this.props.unfollow}
                user={item} />
        });

        return (
            <div>
                <PaginationBar
                    page_count={this.props.total_users_count/this.props.page_size}
                    page_current={this.props.page_current}
                    setUsers={this.props.setUsers}
                    setUsersCount={this.props.setUsersCount}
                    setPageCurrent={this.props.setPageCurrent}
                    page_size={this.props.page_size}
                />
                {users}
            </div>
        );
    };
};


export default UsersFeed;
