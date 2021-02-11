import React from 'react';
import cls from './MenuItem.module.css';
import {NavLink} from 'react-router-dom';

const MenuItem = (props) => {

    let is_active = props.history.location.pathname
        .split('/').includes(props.link.split('/')[1]);

    let styles = [cls.item, cls.text];
    if(is_active) styles.push(cls.active);
    styles = styles.join(' ');
    return (
      <NavLink className={styles} to={props.link} 
        onClick={() => { props.setEditMode(false) } }>
                    {props.text}
            </NavLink>
    );
}

export default MenuItem;
