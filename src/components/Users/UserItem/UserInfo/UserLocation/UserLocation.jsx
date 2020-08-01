import React from 'react';

const UserLocation = (props) => {

    let location = props.location.sity + ', ' + props.location.country;
    return (
        <div>
            {location}
        </div>
    );
};

export default UserLocation;
