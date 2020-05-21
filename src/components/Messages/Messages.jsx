import React from 'react';
import cls from './Messages.module.css';

import MessagesSidebar from './MessagesSidebar/MessagesSidebar.jsx';
import MessagesContent from './MessagesContent/MessagesContent.jsx';

const Messages = (props) => {

    return (
        <div className={cls.message__wraper}>
            <MessagesSidebar dialogs={props.dialogs} />
            <MessagesContent messages={props.messages} />
        </div>
    );
};

export default Messages;
