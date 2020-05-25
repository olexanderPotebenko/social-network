import React from 'react';
import cls from './MessagesContent.module.css';
import MessagesFeedContainer from './MessagesFeedContainer/MessagesFeedContainer.jsx';
import SendMessageContainer from './SendMessageContainer/SendMessageContainer.jsx';

const MessagesContent = (props) => {

    return (
        <div className={cls.dialogs_content_wrapper}>
            <MessagesFeedContainer />
            <SendMessageContainer /> 
        </div>
    );
};

export default MessagesContent;
