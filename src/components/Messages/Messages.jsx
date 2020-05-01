import React from 'react';
import cls from './Messages.module.css';

import Dialogs from './Dialogs/Dialogs.jsx';
import DialogsContent from './DialogsContent/DialogsContent.jsx';

const Messages = (props) => {

    return (
        <div className={cls.message__wraper}>
            <Dialogs />
            <DialogsContent />
        </div>
    );
};

export default Messages;
