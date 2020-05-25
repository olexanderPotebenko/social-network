import React from 'react';
import cls from './MessageItem.module.css';

const MessageItem = (props) => { 

    return (
        <div className={cls.message__item__wrapper}>
            <div className={`${cls.text} ${cls.my__message}`}>
                {props.message_body}  
            </div>
        </div>
    );
};

export default MessageItem;
