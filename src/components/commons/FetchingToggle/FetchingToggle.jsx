import React from 'react';
import toggle from '../../../assets/images/toggle.png';
import style from './FetchingToggle.module.css';

let FetchingToggle = (props) => {

    return <div className={style.wrapper}>
        <img className={style.toggle_img} src={toggle} />
    </div>
};

export default FetchingToggle;
