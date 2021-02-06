import React from 'react';
import styles from './MessagesHistory.module.css';
import {connect} from 'react-redux';
import {compose} from 'redux';
import WithAuthData from '../../../../hocs/WithAuthData.jsx';
import {getHoursMinutes, getDateMonth} from '../../../../utils/functions.js';

class MessagesHistory extends React.Component {

  state = {
    isRendered: false,
  }

  scrollDown = (scrollbar) => {
    scrollbar.current.scrollTop = scrollbar.current.scrollHeight;
  }

  render() {

    let getDateComponent = (str) => {
      return <div className={styles['time-date']}><div>{str}</div></div>
    };

    let history = 'message list is empty..';
    if(this.props.messages) {
      let messages = this.props.messages.map((mess, index, arr) => {
        let isFinal = index === arr.length -1 
          || mess.userId != arr[index + 1].userId
          || new Date(mess.date).getDate() != new Date(arr[index + 1].date).getDate();
        let time = getHoursMinutes(mess.date);
        let elem;
        if(mess.userId === this.props.auth.id) {
          elem = <div className={styles['message-wrp']}>
            <div className={styles.message + ' ' + styles['message-right'] 
                + ' ' + (isFinal && styles['message-right-with-arrow'])}>
              {mess.text}
              <div className={styles.time}>
                {isFinal.toString() + ' ' + new Date(mess.date).getDate()}
              </div>
            </div>
          </div>
        } else {
          elem = <div className={styles['message-wrp']}>
            <div className={styles.message + ' ' + styles['message-left']
                + ' ' + (isFinal && styles['message-left-with-arrow'])}>
              {mess.text}
              <div className={styles.time}>
                {isFinal.toString() + ' ' + new Date(mess.date).getDate()}
              </div>
            </div>
          </div>
        }
        return elem;
      });

     history = []; 
      let now = new Date().getDate();
      this.props.messages.forEach((mess, index, arr) => {
        let date = new Date(mess.date).getDate();

        if (index ===  0 && now != date) {
          history.push(getDateComponent(getDateMonth(mess.date)));
          history.push(messages[index]);
        } else if (date != new Date(arr[index - 1].date).getDate()){
          if(date == now ) history.push(getDateComponent('Today'));
          else history.push(getDateComponent(getDateMonth(mess.date))); 
          history.push(messages[index]);
        } else {
          history.push(messages[index]);
        }
      })

      history.push(<div style={ {
        height: '40px',
        } } ></div>);
    };

    let scrollbar = React.createRef();
    setTimeout(() => {
      if(scrollbar.current && !this.state.isRendered) this.scrollDown(scrollbar);
    }, 50);

    return <div ref={scrollbar} className={' custom_scroll_bar'}
      style={ {
        height: '100%',
        padding: '10px',
      } }>
      {history}
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
