import React from 'react';
import cls from './MessagesFeed.module.css';
import MessageItem from './MessageItem/MessageItem.jsx';

const MessagesFeed = (props) => {

    let messages = [<MessageItem />];
    messages.push(<MessageItem />);
    messages.push(<MessageItem />);
    messages.push(<MessageItem />);
    messages.push(<MessageItem />);

    return (
        <div className={cls.messages__feed__wrapper}>
            {messages}
        </div>
    )
};

export default MessagesFeed;
