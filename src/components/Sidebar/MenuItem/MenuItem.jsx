import React from 'react';
import styles from './MenuItem.module.css';
import {NavLink} from 'react-router-dom';

const MenuItem = (props) => {

    let is_active = props.history.location.pathname
        .split('/').includes(props.link.split('/')[1]);

    let stylesArr = [styles.item, styles.text];
    if(is_active) stylesArr.push(styles.active);
    stylesArr = stylesArr.join(' ');
    return (
      <NavLink className={stylesArr} to={props.link} 
        onClick={() => { props.setEditMode(false) } }>
        {props.img}
                    {props.text}
            </NavLink>
    );
}

export default MenuItem;
