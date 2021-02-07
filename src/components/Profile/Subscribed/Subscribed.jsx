import React from 'react';
import {connect} from 'react-redux';
import styles from './Subscribed.module.css';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import UserItem from '../../commons/UserItem/UserItem';
import Anchor from '../../commons/Anchor/Anchor';

class Subscribed extends React.Component {

    render() {
    console.log('SUBSCRIBIED');
    console.log(this.props.subscribed);

        let subscribed = this.props.subscribed.map(user => 
            <UserItem user={user} /> );

        let scrollbar = React.createRef();
      return <div className={styles.wrp}>
        <div ref={scrollbar} className={styles.scrollbar}>
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
                    </div>
    }
}

let mapStateToProps = (state) => {
    return {
        subscribed: state.profilePage.profile.subscribed_to,
    };
};

export default connect(mapStateToProps, {})(Subscribed);
