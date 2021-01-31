import React from 'react';
import styles from './Dialog.module.css';

import {getFormatedDate} from '../../../utils/functions.js';

class Dialog extends React.Component {

  render() {

    let time = getFormatedDate(this.props.dialog.dateLastModified);
    time = time.split(':');    
    time = time[0] + ':' + time[1] + time[2].slice(-3);

    console.log(this.props.dialog);
    let lastMessage = this.props.dialog.lastMessage || 'massage list is empty..';
    return <div className={styles.wrp}>
      <div className={styles['container-left']} >
        <div className={styles.avatar}>
          <img src={this.props.dialog.user_avatar} />
        </div>
      </div>
      <div className={styles['container-middle']}>
        <div className={styles.name}>
          {this.props.dialog.user_name}
        </div>
        <div className={styles['last-message']}>
          <span>
            {lastMessage}
          </span>
        </div>
      </div>
      <div className={styles['container-right']}>
        <div className={styles.time}>
          {time}
        </div>
      </div>
    </div>

  }

}

export default Dialog;
