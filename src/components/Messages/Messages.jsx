import React from 'react';
import cls from './Messages.module.css';
import {compose} from 'redux';

import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';
import WithAuthData from '../../hocs/WithAuthData.jsx';

import MessagesSidebarContainer from './MessagesSidebarContainer/MessagesSidebarContainer.jsx';
import MessagesContent from './MessagesContent/MessagesContent.jsx';

const Messages = (props) => {

    return (
        <div className={cls.message__wraper}>
            <MessagesSidebarContainer dialogs={props.dialogs} />
            <MessagesContent messages={props.messages} />
        </div>
    );
};

export default compose(
    WithAuthData,
    WithSignInRedirect,
)(Messages);
