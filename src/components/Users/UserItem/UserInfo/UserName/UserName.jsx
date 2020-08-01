import React from 'react';

const UserName = (props) => {

    let name = {
        first_name: props.name.split(' ')[0],
        last_name: props.name.split(' ')[1] || ''
    };

    return (
        <div>
            {name.first_name + ' ' + name.last_name}
        </div>
    );
};

export default UserName;
