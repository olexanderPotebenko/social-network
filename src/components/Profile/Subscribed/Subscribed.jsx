import React from 'react';
import {connect} from 'react-redux';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import UserItem from '../../commons/UserItem/UserItem';

class Subscribers extends React.Component {

    render() {

        let subscribers = this.props.subscribers.map(user => 
            <UserItem user={user} /> );
        return <>
            {this.props.subscribers.length}
            {
                this.props.subscribers
                && this.props.subscribers.length
                && subscribers
                || <ListIsEmpty />
            }
            </>
    }
}

let mapStateToProps = (state) => {
    debugger;
    return {
        subscribers: state.auth.subscribers,
    };
};

export default connect(mapStateToProps, {})(Subscribers);
