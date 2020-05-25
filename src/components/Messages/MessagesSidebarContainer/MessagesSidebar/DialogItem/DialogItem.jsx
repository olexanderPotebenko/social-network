import React from 'react';
import cls from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem = (props) => {

    let path = `/messages/${props.id}`;
    return (
        <div className={cls.dialog__item}>
            <NavLink to={path} activeClassName={cls.active}>{props.name}</NavLink> 
        </div>
    );
};

export default DialogItem;
