import React from 'react';
import cls from './MenuItem.module.css';
import {NavLink} from 'react-router-dom';

const MenuItem = (props) => {

    return (
        <>
        <NavLink activeClassName={cls.link__container} to={props.link}>
            <div className={cls.text}>
                {props.text}
            </div>
        </NavLink>
        </>
    );
}

export default MenuItem;
