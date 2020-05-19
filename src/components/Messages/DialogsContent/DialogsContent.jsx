import React from 'react';
import cls from './DialogsContent.module.css';
import MessagesFeed from './MessagesFeed/MessagesFeed.jsx';
import AddMessage from './AddMessage/AddMessage.jsx';

const DialogsContent = (props) => {

    return (
        <div className={cls.dialogs_content_wrapper}>
            <MessagesFeed />
            <AddMessage /> 
        </div>
    );
};

export default DialogsContent;
