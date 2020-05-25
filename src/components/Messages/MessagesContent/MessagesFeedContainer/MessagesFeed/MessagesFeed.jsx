import React from 'react';
import cls from './MessagesFeed.module.css';
import MessageItem from './MessageItem/MessageItem.jsx';

const MessagesFeed = (props) => {

    let messages = props.messages.map(item => 
        <MessageItem name={item.user_id} message_body={item.message_body} />);

    return (
        <div className={cls.messages__feed__wrapper}>
            {messages}
        </div>
    )
};

export default MessagesFeed;
