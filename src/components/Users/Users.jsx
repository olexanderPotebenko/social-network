import React from 'react';
import Filter from './Filter/Filter.jsx';
import UsersFeedContainer from './UsersFeedContainer/UsersFeedContainer.jsx';
import cls from './Users.module.css';

const Users = (props) => {

    return (
        <div className={cls.users}>
            <Filter />
            <UsersFeedContainer />
        </div>
    );
};

export default Users;
