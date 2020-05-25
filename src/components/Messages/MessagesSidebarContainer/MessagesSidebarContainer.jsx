import React from 'react';
import {connect} from 'react-redux';
import MessagesSidebar from './MessagesSidebar/MessagesSidebar.jsx';

let mapsStateToProps = (state) => {
    return {dialogs: state.messagesPage.dialogs.map(item => item.dialog_id)};
};

let mapsDispatchToProps = (dispatch) => ({
    dispatch: dispatch});

const MessagesSidebarContainer = connect(mapsStateToProps, mapsDispatchToProps)(MessagesSidebar);

export default MessagesSidebarContainer;
