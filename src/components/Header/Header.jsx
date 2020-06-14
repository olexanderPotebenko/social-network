import React from 'react';
import cls from './Header.module.css';

const Header = (props) => {
    return (
        <header className={cls.header}>
            <div className={cls.logo_wrapper}>
                <img className={cls.header_logo} src='https://images.opencollective.com/reactjs-dallas/7be2a10/logo/256.png' />
            </div>
        </header>
    )
};

export default Header;
