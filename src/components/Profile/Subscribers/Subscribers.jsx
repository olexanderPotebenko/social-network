import React from 'react';
import styles from './Subscribers.module.css';
import {connect} from 'react-redux';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import UserItem from '../../commons/UserItem/UserItem';
import Anchor from '../../commons/Anchor/Anchor';

class Subscribers extends React.Component {

  render() {

    let subscribers = this.props.subscribers.map(user => 
      <UserItem user={user} /> );

    let scrollbar = React.createRef();

    return <div className={styles.wrp}>
      <div ref={scrollbar} className={styles.scrollbar}>

        <Anchor scrollbar={scrollbar} />

        {
          this.props.subscribers
            && this.props.subscribers.length
            && subscribers
            || <ListIsEmpty />
        }
      </div>
    </div>
  }
}

let mapStateToProps = (state) => {
    return {
        subscribers: state.profilePage.profile.subscribers,
    };
};

export default connect(mapStateToProps, {})(Subscribers);
