import React from 'react';
import Filter from './Filter/Filter.jsx';
import UsersFeedContainer from './UsersFeedContainer/UsersFeedContainer.jsx';

const Users = (props) => {

    return (
        <div>
            <Filter />
            <UsersFeedContainer />
        </div>
    );
};

export default Users;
