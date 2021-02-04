import React from 'react';
import styles from './Dialog.module.css';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import WithAuthData from '../../../hocs/WithAuthData.jsx';

import backImg from '../../../assets/images/back.png';

import {selectDialog, getDialog, sendMessage} from '../../../reducers/messagesReducer.js';

import SendMessage from './SendMessage/SendMessage';
import MessagesHistory from './MessagesHistory/MessagesHistory.jsx';

class Dialog extends React.Component {

  componentDidMount () {
    // let {id, token, dialog_id} = options;
   
  let options = {
      id: this.props.auth.id,
      token: this.props.auth.token,
      dialog_id: this.props.currentDialog,
    };

    this.props.getDialog(options);
  }

  onSubmit = (formData) => {
    //let {id, token, user_id, message} = options;
    let message = {
      text: formData['send-message'],
      date: new Date(),
    };
    let options = {
      id: this.props.auth.id,
      token: this.props.auth.token,
      user_id: this.props.messagesPage.dialog.user_id,
      message,
    };
    this.props.sendMessage(options).then(res => {
      let options2 = {
        id: this.props.auth.id,
        token: this.props.auth.token,
        dialog_id: this.props.currentDialog,
      };

      this.props.getDialog(options2);
    });

  }

  render() {

    return <div className={styles.wrp}>
      <div className={styles.history}>
        <MessagesHistory />
        <button className={styles['back-button']}
          onClick={() => {
            this.props.history.goBack();
            this.props.selectDialog('');
          } } >
          <img src={backImg} />
        </button>
      </div>
      <div className={styles['send-message-panel']}>
        <div></div>
        <SendMessage onSubmit={this.onSubmit} />
        <div></div>
      </div>
    </div>
  }

}

const mapsStateToProps = (state) => {
  return {
    currentDialog: state.messagesPage.currentDialog,
    messagesPage: state.messagesPage,
  };
}

const mapsDispatchToProps = {
  selectDialog,
  getDialog,
  sendMessage,
};

export default compose (
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps)
)(Dialog);
