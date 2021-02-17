import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import {removeNotification, setOpacity} from '../../reducers/notifi.js';
import CloseButton from '../commons/CloseButton/CloseButton.jsx';

import styles from './Notification.module.css';
import avatar from '../../assets/images/avatar_default.png';

class Notification extends React.Component {

  componentDidMount () {

    alert('Create component');
    let interval = setInterval(() => {
      console.log(interval + ' interval');
      setTimeout(() => {
        this.props.notifications.forEach(item => {
          let now = new Date().getTime();
          let end = item.date + 2 * 1000;
          let rest = (end - now)/(end - item.date);
          rest = rest < 0? 0: rest;
          console.log(rest);
          debugger;
          if(now > end) this.props.removeNotification(item.id);
          else if (rest < .8) this.props.setOpacity(item.id, rest);
        });
      }, 20);
    }, 100);
  }

  render() {

    let notifications = this.props.notifications.map(item => 
      <div className={styles['item-wrp']}>
        <div className={styles.item} 
          style={ {opacity: item.opacity} }>
          <img className={styles.avatar} src={avatar} />
          <div>
            <div className={styles.name}>
              Fsfsaf Fadfjsd
            </div>
            <div className={styles.description}>
              {item.description}
            </div>
          </div>
          <div className={styles.close}>
            <CloseButton close={this.props.removeNotification.bind(this, item.id)} />
          </div>
        </div>
      </div>
    );

    debugger;

    return <div className={styles.wrp}
      style={ {bottom: 80*this.props.notifications.length} }>
      <div className={styles.container}>
        {notifications}
      </div>
    </div>
  }
}

const mapsStateToProps = state => {
  return {
    notifications: state.notifi.notifications,
  }
}

const mapsDispatchToProps = {
  removeNotification,
  setOpacity,
}

export default compose (
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps)
)(Notification);

