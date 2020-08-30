import React from 'react';
import toggle from '../../../assets/images/toggle.png';
import style from './FetchingToggle.module.css';

let FetchingToggle = (props) => {

    return <div className={style.wrapper}>
            <img className={style.toggle_img + ' ' + (props.background === true && style.with_background || '')} src={toggle} />
    </div>
};

export default FetchingToggle;
