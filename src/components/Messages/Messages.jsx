import React from 'react';
import styles from './Messages.module.css';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, NavLink} from 'react-router-dom';
//hoocs
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';
import WithAuthData from '../../hocs/WithAuthData.jsx';
//components
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle';
import Dialog from './Dialog/Dialog'
//reducers
import {getDialogs, sendMessage, selectDialog} from '../../reducers/messagesReducer';
//utils
import {getFormatedDate} from '../../utils/functions.js';

class Messages extends React.Component {

  componentDidMount() {
    let options = {
      id: this.props.auth.id,
      token: this.props.auth.token,
    };
    this.props.getDialogs(options);

  }

  render() {
    if (this.props.currentDialog &&
    !this.props.history.location.pathname.split('/').includes('dialog') ) {
      debugger;
      this.props.history.push(this.props.history.location.pathname + `dialog/${this.props.currentDialog}/`);
    }
    debugger;
    // в компонене Messages будут отображаться только существующие диалоги, создать новый невозможно

    let dialogs = this.props.dialogs;
    if(dialogs.length === 0) {
      dialogs = 'Dialogs list is empty'
    }else {
      dialogs = dialogs.map(dialog => {
        let time = getFormatedDate(dialog.dateLastModified);
        debugger;
        time = time.split(':');    
        debugger;
        if(time.length === 1) time = time[0];
        else time = time[0] + ':' + time[1] + time[2].slice(-3);

        let lastMessage = dialog.lastMessage? dialog.lastMessage.text: 'massage list is empty..';
        if(lastMessage.length > 30) lastMessage = '...' + lastMessage.slice(-30);
        return <NavLink to={`dialog/${dialog.dialog_id}/`}
          className={styles['item-dialog']}
          onClick={() => {this.props.selectDialog(dialog.dialog_id);} }>
            <div className={styles['container-left']} >
              <div className={styles.avatar}>
                <img src={dialog.user_avatar} />
              </div>
            </div>
            <div className={styles['container-middle']}>
              <div className={styles.name}>
                <h3 style={ {
                  'text-decoration': 'none',
                  } }>
                {dialog.user_name}
                </h3>
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
        </NavLink>
      })
    }
    return (
      <div className={styles.wrp}>
        {
          this.props.currentDialog ? 
            <Route component={Dialog} path={`/messages/:id/dialog/:dialog_id/`} /> :
        dialogs
        }
      </div>
    );
  };
};

let mapsStateToProps = state => {
  return {
    isFetching: state.messagesPage.isFetching,
    dialogs: state.messagesPage.dialogs,
    currentDialog: state.messagesPage.currentDialog,
  };
};

export default compose(
  WithAuthData,
  WithSignInRedirect,
  connect(mapsStateToProps, {getDialogs, sendMessage, selectDialog}),
)(Messages);
