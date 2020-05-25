import React from 'react';
import UserItem from './UserItem/UserItem.jsx';

const UsersFeed = (props) => {

    let users = props.state.users.map(item => <UserItem 
        follow={props.follow}
        unfollow={props.unfollow}
        user={item} />);

    return (
        <div>
            {users}
        </div>
    );
};

export default UsersFeed;
