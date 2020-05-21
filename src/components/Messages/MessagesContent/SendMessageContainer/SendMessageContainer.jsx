import React from 'react';
import {connect} from 'react-redux';
import SendMessage from './SendMessage/SendMessage.jsx';

let mapsStateToProps = (state) => {
    return {
        textNewMessage: state.messagesPage.textNewMessage
    };
};

let mapsDispatchToProps = (dispatch) => {
    return {dispatch: dispatch};
};

const SendMessageContainer = connect(mapsStateToProps, mapsDispatchToProps)(SendMessage);

export default SendMessageContainer;
