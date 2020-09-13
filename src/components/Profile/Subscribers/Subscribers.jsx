import React from 'react';
import {connect} from 'react-redux';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import UserItem from '../../commons/UserItem/UserItem';
import Anchor from '../../commons/Anchor/Anchor';

class Subscribers extends React.Component {

    render() {

        let subscribers = this.props.subscribers.map(user => 
            <UserItem user={user} /> );
        
        let scrollbar = React.createRef();

        return <div ref={scrollbar} className={' custom_scroll_bar'}
                style={ {width: '100%', height: '100%'} }>

            <Anchor scrollbar={scrollbar} />

            {
                this.props.subscribers
                && this.props.subscribers.length
                && subscribers
                || <ListIsEmpty />
            }
            </div>
    }
}

let mapStateToProps = (state) => {
    return {
        subscribers: state.profilePage.profile.subscribers,
    };
};

export default connect(mapStateToProps, {})(Subscribers);
