import React from 'react';
import cls from './Header.module.css';

const Header = () => {
    return (
<header className={cls.header}>
    <img className={cls.header_logo} src='https://images.opencollective.com/reactjs-dallas/7be2a10/logo/256.png' />
    </header>
    )
};

export default Header;
