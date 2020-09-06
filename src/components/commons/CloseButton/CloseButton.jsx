import React from 'react';
import styles from './CloseButton.module.css';
import criss_cross from '../../../assets/images/criss-cross.png';

let CloseButton = (props) => {

    return <div className={styles.wrp}>
        <a onClick={
            (e) => {
                e.preventDefault();
                props.close();
            } }>
            <img src={criss_cross} />
        </a>
    </div>
}

export default CloseButton;
