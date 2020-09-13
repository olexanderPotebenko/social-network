import React from 'react';
import {connect} from 'react-redux';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import UserItem from '../../commons/UserItem/UserItem';
import Anchor from '../../commons/Anchor/Anchor';

class Subscribed extends React.Component {

    render() {

        let subscribed = this.props.subscribed.map(user => 
            <UserItem user={user} /> );

        let scrollbar = React.createRef();
        return (
            <div ref={scrollbar} className={' custom_scroll_bar'}
                style={ {width: '100%', height: '100%'} }>
                <Anchor scrollbar={scrollbar} />
                <div>
                {
                    this.props.subscribed
                        && this.props.subscribed.length
                        && subscribed
                        || <ListIsEmpty />
                }
                    </div>
                    </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        subscribed: state.profilePage.profile.subscribed_to,
    };
};

export default connect(mapStateToProps, {})(Subscribed);
