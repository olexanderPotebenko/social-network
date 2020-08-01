import React from 'react';

const UserAge = (props) => {

    let date = new Date(props.birth_date);
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;

    date = `${day}.${month}.${date.getFullYear()}`;

    return (
        <div>
            {date} 
        </div>
    );
};

export default UserAge;
