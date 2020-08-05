import React from 'react';
import {connect} from 'react-redux';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import UserItem from '../../commons/UserItem/UserItem';

class Subscribed extends React.Component {

    render() {

        let subscribed = this.props.subscribed.map(user => 
            <UserItem user={user} /> );
        return <>
            {this.props.subscribed.length}
            {
                this.props.subscribed
                && this.props.subscribed.length
                && subscribed
                || <ListIsEmpty />
            }
            </>
    }
}

let mapStateToProps = (state) => {
    debugger;
    return {
        subscribed: state.profilePage.profile.subscribed_to,
    };
};

export default connect(mapStateToProps, {})(Subscribed);
