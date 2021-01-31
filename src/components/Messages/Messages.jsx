import React from 'react';
import cls from './Messages.module.css';

import {compose} from 'redux';
import {connect} from 'react-redux';
//hoocs
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';
import WithAuthData from '../../hocs/WithAuthData.jsx';
//components
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle';
import Dialog from './Dialog/Dialog'
//reducers
import {getDialogs, sendMessage} from '../../reducers/messagesReducer';

class Messages extends React.Component {

  componentDidMount() {
    let options = {
      id: this.props.auth.id,
      token: this.props.auth.token,
    };
    this.props.getDialogs(options);

  }

  render() {
    debugger;
    // в компонене Messages будут отображаться только существующие диалоги, создать новый невозможно

    let dialogs = this.props.dialogs;
    if(dialogs.length === 0) {
      dialogs = 'Dialogs list is empty'
    }else {
      dialogs = dialogs.map(dialog => {
        return <Dialog dialog={dialog} />
      })
    }
    return (
      <div>
        {dialogs}

      </div>
    );
  };
};

let mapsStateToProps = state => {
  return {
    isFetching: state.messagesPage.isFetching,
    dialogs: state.messagesPage.dialogs,
  };
};

export default compose(
  WithAuthData,
  WithSignInRedirect,
  connect(mapsStateToProps, {getDialogs, sendMessage}),
)(Messages);
