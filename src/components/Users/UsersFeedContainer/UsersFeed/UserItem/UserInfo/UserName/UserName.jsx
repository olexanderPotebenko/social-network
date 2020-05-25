import React from 'react';

const UserName = (props) => {

    return (
        <div>
            {props.name.first_name + ' ' + props.name.last_name}
        </div>
    );
};

export default UserName;
