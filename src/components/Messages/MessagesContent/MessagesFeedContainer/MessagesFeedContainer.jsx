import React from 'react';
import {connect} from 'react-redux';
import MessagesFeed from './MessagesFeed/MessagesFeed.jsx';

let mapsStateToProps = (state) => {
    return {messages: state.messagesPage.dialogs[0].messages};
};

let mapsDispatchToProps = (dispatch) => {
    return {dispatch: dispatch};
};

const MessagesFeedContainer = connect(mapsStateToProps, mapsDispatchToProps)(MessagesFeed);

export default MessagesFeedContainer;
