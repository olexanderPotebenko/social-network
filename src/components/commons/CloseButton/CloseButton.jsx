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
          <svg xmlns="http://www.w3.org/2000/svg" class="rubicons x" width="25" height="25" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
            <path d="M18 6L6 18M18 18L6 6" stroke-linecap="round"></path>
          </svg>
        </a>
    </div>
}

export default CloseButton;
