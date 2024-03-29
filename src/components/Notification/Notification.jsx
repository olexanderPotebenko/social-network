import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import WithAuthData from '../../hocs/WithAuthData.jsx';
import {removeNotification, setOpacity} from '../../reducers/notifi.js';
import CloseButton from '../commons/CloseButton/CloseButton.jsx';
import Avatar from '../commons/Avatar/Avatar.jsx';

import styles from './Notification.module.css';
import avatar from '../../assets/images/avatar_default.png';

import {getHoursMinutesSeconds} from '../../utils/functions.js';

class Notification extends React.Component {

  componentDidMount () {

    //alert('Create component');
    let interval = setInterval(() => {
      // console.log(interval + ' interval');
      setTimeout(() => {
        this.props.notifications.forEach(item => {
          let now = new Date().getTime();
          let end = item.date + 7 * 1000;
          let rest = (end - now)/(end - item.date);
          rest = rest < 0? 0: rest;
          // console.log(rest);
          if(now > end) this.props.removeNotification(item.id);
          else if (rest < .8) this.props.setOpacity(item.id, rest);
        });
      }, 20);
    }, 100);
  }

  render() {

    let avatarStyles = {
      wrp: {
        width: 50,
        height: 50,
      },
      avatar: {
      },
    };

    let notifications = this.props.notifications.map(item => 
      <div className={styles['item-wrp']}>
        <div className={styles.item} 
          style={ {opacity: item.opacity} }>
          <Avatar id={item.user.id} styles={avatarStyles}/>
          <div>
            <div className={styles.name}>
              {item.user.name}
            </div>
            <div className={styles.description}>
              {item.description + ' ' + getHoursMinutesSeconds(item.date)}
            </div>
          </div>
          <div className={styles.close}>
            <CloseButton close={this.props.removeNotification.bind(this, item.id)} />
          </div>
        </div>
      </div>
    );


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

