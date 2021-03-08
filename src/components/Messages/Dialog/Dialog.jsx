import React from 'react';
import styles from './Dialog.module.css';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import WithAuthData from '../../../hocs/WithAuthData.jsx';


import {getDialog, sendMessage, setDialogIsFetching} from '../../../reducers/messagesReducer.js';

import SendMessage from './SendMessage/SendMessage';
import MessagesHistory from './MessagesHistory/MessagesHistory.jsx';
import DialogInfo from './DialogInfo/DialogInfo.jsx';
import FetchingToggle from '../../commons/FetchingToggle/FetchingToggle.jsx';

class Dialog extends React.Component {

  componentDidMount () {
   
  let options = {
      id: this.props.auth.id,
      token: this.props.auth.token,
      dialog_id: this.props.currentDialog,
    };

    this.props.setDialogIsFetching(true);
    this.props.getDialog(options)
      .then(res => this.props.setDialogIsFetching(false));
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

      this.props.getDialog(options2)
    });

  }

  state = {
    wrp: React.createRef(),
  }

  render() {

    return <>
      {
        this.props.dialogIsFetching
          && <div className={styles['fetching-wrp']}>
      <div className={styles['fetching']}>
        <FetchingToggle width={50} height={50}/>
      </div>
    </div>
      || 
      <div ref={this.state.wrp} className={styles.wrp}
        style={ {
          'grid-template-rows': '80px 1fr 120px',
        } }>
        <div className={styles['dialog-info']}>
          <DialogInfo history={this.props.history} />
        </div>
        <MessagesHistory />
        <div className={styles['send-message']}>
          <SendMessage onSubmit={this.onSubmit} wrp={this.state.wrp} />
        </div>
      </div>
      }
      </>
  }

}

const mapsStateToProps = (state) => {
  return {
    currentDialog: state.messagesPage.currentDialog,
    messagesPage: state.messagesPage,
    dialogIsFetching: state.messagesPage.dialogIsFetching,
  };
}

const mapsDispatchToProps = {
  getDialog,
  sendMessage,
  setDialogIsFetching,
};

export default compose (
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps)
)(Dialog);
