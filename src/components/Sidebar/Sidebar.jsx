import React from 'react';
import cls from './Sidebar.module.css';
import Item from './Item/Item.jsx';

const Sidebar = () => {
    return (
        <div className={cls.sidebar}>
            <nav className={cls.container}>
                <Item link='/profile' text='Profiles' />
                <Item link='/messages' text='Messages' />
                <Item link='/users' text='Users' />
                <Item link='/news' text='News' />
                <Item link='/music' text='Music' />
                <Item link='/settings' text='Settings' />
            </nav>
        </div>
    )
};

export default Sidebar;
