import React from 'react';
import cls from './MessagesSidebar.module.css';
import DialogItem from './DialogItem/DialogItem.jsx';

const MessagesSidebar = (props) => {

    let dialogs_list = props.dialogs.map(item => 
        <DialogItem id={item} name={item} />);
    return (
        <div className={cls.dialogs}>
            MessagesSidebar
            {dialogs_list}
        </div>
    );
};

export default MessagesSidebar;
