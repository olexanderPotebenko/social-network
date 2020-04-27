import React from 'react';
import cls from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <nav className={cls.sidebar}>
            <div><a href='/profiles'>Profiles</a></div>
            <div><a href='/messages'>Messages</a></div>
            <div><a href='/news'>News</a></div>
            <div><a href='/music'>Music</a></div>
            <div><a href='/settings'>Settings</a></div>
        </nav>
    )
};

export default Sidebar;
