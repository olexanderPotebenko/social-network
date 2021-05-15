import React from 'react';
import styles from './Messages.module.css';
import avatar_default from '../../assets/images/avatar_default.png';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Route, NavLink} from 'react-router-dom';
//hoocs
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';
import WithAuthData from '../../hocs/WithAuthData.jsx';
//components
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle';
import ListIsEmpty from '../commons/ListIsEmpty/ListIsEmpty.jsx';
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
      this.props.history.location.pathname.split('/').filter(rout => rout != '')[0] == 'messages' &&
      !this.props.history.location.pathname.split('/').includes('dialog') ) {
      this.props.history
        .push(this.props.history.location.pathname + `dialog/${this.props.currentDialog}/`);
    }
    // в компонене Messages будут отображаться только существующие диалоги, создать новый невозможно

    let dialogs = this.props.dialogs;
    if(dialogs.length > 0) {
      dialogs = dialogs.sort( (d1, d2) => d2.dateLastModified - d1.dateLastModified)
        .map(dialog => 
          <DialogItem dialog={dialog} auth={this.props.auth} 
            selectDialog={this.props.selectDialog.bind(this)}/>);
    }
    return (
      <div className={styles.wrp}>
        {
          this.props.currentDialog ? 
            <Route component={Dialog} path={`/messages/:id/dialog/:dialog_id/`} /> :
          this.props.dialogsIsFetching
          && <div className={styles.fetching}>
            <FetchingToggle />
          </div>
          || (dialogs.length?
            <div className={styles.scrollbar}>
              {dialogs}
            </div>:
              <ListIsEmpty />
          )
        }
      </div>
    );
  };
};

class DialogItem extends React.Component {

  state = {
    id: this.props.dialog.user_id,
    photo: this.props.dialog.user_avatar,
    load: false,
  }

  componentDidMount() {
    let dialog = this.props.dialog;
  }
  componentDidUpdate(prevProps) {
    if(prevProps.dialog.user_avatar != this.props.dialog.user_avatar) {
      this.setState({photo: this.props.dialog.user_avatar});
    };
  }

  onError = () => {
    this.setState({photo: avatar_default});
    this.setState({load: true});
  }

  onLoad = () => {
    this.setState({load: true});
  }

  render() {
    let dialog = this.props.dialog;

    let time = getFormatedDate(dialog.dateLastModified);
    time = time.split(':');    
    if(time.length === 1) time = time[0];
    else time = time[0] + ':' + time[1] + time[2].slice(-3);

    debugger;
    let lastMessage = dialog.lastMessage? dialog.lastMessage.text: 'massage list is empty..';
    if(lastMessage.length > 50) lastMessage = lastMessage.slice(0, 50) + '...';
    return <NavLink to={`/messages/${this.props.auth.id}/dialog/${dialog.dialog_id}/`}
      className={styles['item-dialog']}
      onClick={() => {this.props.selectDialog(dialog.dialog_id);} }>
      <div className={styles['container-left']} >
        <div className={styles.avatar}>
          { !this.state.load
              && <div className={styles.fetching}>
          <FetchingToggle />
        </div>
        }
        <img src={this.state.photo} 
          onLoad={this.onLoad}
          onError={this.onError} />
      </div>

    </div>
      <div className={styles['container-right']}>
        <div>
          <div className={styles.time}>
            {time}
          </div>
        </div>
        <div className={styles.name}>
          <h3 style={ {
            'text-decoration': 'none',
            } }>
            {dialog.user_name}
          </h3>
        </div>
        <div className={styles['last-message']}>
          {
            dialog.lastMessage && !dialog.lastMessage.read && 
              dialog.lastMessage.userId != this.props.auth.id
              &&
              <span className={styles['unread']}>
          {lastMessage}
        </span>
          || <span>
            {lastMessage}
          </span>
          }
      </div>
      </div>
      </NavLink>
  }
}

let mapsStateToProps = state => {
  return {
    dialogsIsFetching: state.messagesPage.dialogsIsFetching,
    dialogs: state.messagesPage.dialogs,
    currentDialog: state.messagesPage.currentDialog,
  };
};

export default compose(
  WithAuthData,
  WithSignInRedirect,
  connect(mapsStateToProps, {getDialogs, sendMessage, selectDialog}),
)(withRouter(Messages));
