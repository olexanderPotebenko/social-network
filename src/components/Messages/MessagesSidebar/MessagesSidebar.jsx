import React from 'react';
import cls from './MessagesSidebar.module.css';
import DialogItem from './DialogItem/DialogItem.jsx';

const MessagesSidebar = (props) => {

    return (
        <div className={cls.dialogs}>
            MessagesSidebar
            <DialogItem name='Sasha' id='1' />
            <DialogItem name='Sveta' id='2' />
            <DialogItem name='Serega' id='3'/>
            <DialogItem name='Solomiya' id='4' />
            <DialogItem name='Sabrina' id='5' />
        </div>
    );
};

export default MessagesSidebar;
