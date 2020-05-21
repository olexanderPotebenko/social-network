import React from 'react';
import cls from './MessagesContent.module.css';
import MessagesFeed from './MessagesFeed/MessagesFeed.jsx';
import SendMessageContainer from './SendMessageContainer/SendMessageContainer.jsx';

const MessagesContent = (props) => {

    return (
        <div className={cls.dialogs_content_wrapper}>
            <MessagesFeed />
            <SendMessageContainer /> 
        </div>
    );
};

export default MessagesContent;
