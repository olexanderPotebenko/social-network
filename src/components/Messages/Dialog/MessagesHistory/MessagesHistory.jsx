import React from 'react';
import styles from './MessagesHistory.module.css';
import {connect} from 'react-redux';
import {compose} from 'redux';
import WithAuthData from '../../../../hocs/WithAuthData.jsx';
import {getFormatedDate} from '../../../../utils/functions.js';

class MessagesHistory extends React.Component {

  render() {

    console.log(this.props.messages);
    let messages = 'message list is empty..';
    if(this.props.messages) {
      messages = this.props.messages.map((mess, index, arr) => {
        let isFinal = index === arr.length -1 || mess.userId != arr[index + 1].userId;
        let time = getFormatedDate(mess.date);
        let elem;
        if(mess.userId === this.props.auth.id) {
          elem = <div className={styles['message-wrp']}>
            <div className={styles.message + ' ' + styles['message-right'] 
                + ' ' + (isFinal && styles['message-right-with-arrow'])}>
              {mess.text}
              <div className={styles.time}>
                {time}
              </div>
            </div>
          </div>
        } else {
          elem = <div className={styles['message-wrp']}>
            <div className={styles.message + ' ' + styles['message-left']
                + ' ' + (isFinal &&  styles['message-left-with-arrow'])}>
              {mess.text}
              <div className={styles.time}>
                {time}
              </div>
            </div>
          </div>
        }
        return elem;
      });
      messages.push(<div style={ {
        height: '40px',
        } } ></div>);
    };

    let scrollbar = React.createRef();
    return <div ref={scrollbar} className={' custom_scroll_bar'}
      style={ {
        height: '100%',
        padding: '10px',
      } }>
      {messages}
    </div>
  }
};

const mapsStateToProps = state => {
  return {
    messages: state.messagesPage.dialog.messages,
  };
};

const mapsDispatchToProps = {
};

export default compose (
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps),
)(MessagesHistory);
