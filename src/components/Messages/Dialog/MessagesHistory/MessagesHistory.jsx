import React from 'react';
import styles from './MessagesHistory.module.css';
import {connect} from 'react-redux';
import {compose} from 'redux';
import WithAuthData from '../../../../hocs/WithAuthData.jsx';
import {getHoursMinutes, getDateMonth} from '../../../../utils/functions.js';
import {readMessages} from '../../../../reducers/messagesReducer.js';

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
              <div>
                <div className={styles.read}>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    class="rubicons check" 
                    width="19" height="19" viewBox="0 0 24 24" 
                    stroke={mess.read && "currentColor" || "#335"} stroke-width="2.5" fill="none">
                    <path d="M4 13l5 5L20 6" stroke-linecap="round"></path>
                  </svg>
                </div>
                <div className={styles.time}>
                  {time}
                </div>
              </div>
            </div>
          </div>
        } else {
          elem = <div className={styles['message-wrp']}>
            <div className={styles.message + ' ' + styles['message-left']
                + ' ' + (isFinal && styles['message-left-with-arrow'])}>
              {mess.text}
              <div>
                <div className={styles.time}>
                  {time}
                </div>
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
        } else if (arr.length === 1 || index === 0 || date != new Date(arr[index - 1].date).getDate()){
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

    //let {id, token, dialog_id, messages} = options;
    if(this.props.messages) {
      let unreadMessages = this.props.messages
        .filter(mess => mess.userId !== this.props.auth.id && !mess.read);

      console.log('UNREAD MESS');
      console.log(unreadMessages);
      if(unreadMessages.length){
        let options = {
          id: this.props.auth.id,
          token: this.props.auth.token,
          dialog_id: this.props.dialog.dialog_id,
          messages: unreadMessages,
        }
        //alert(options.messages.length);
        this.props.readMessages(options);
      }
  }

    return <div className={styles.wrp}>
        <div ref={scrollbar} className={styles.scrollbar}>
      {history}
    </div>
    </div>
  }
};

const mapsStateToProps = state => {
  return {
    messages: state.messagesPage.dialog.messages,
    dialog: state.messagesPage.dialog,
  };
};

const mapsDispatchToProps = {
  readMessages,
};

export default compose (
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps),
)(MessagesHistory);
