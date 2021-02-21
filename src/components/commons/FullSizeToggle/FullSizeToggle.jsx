import React from 'react';
import styles from './FullSizeToggle.module.css';

let svg = [
  <svg fill="none" class="rubicons maximize" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
    <path d="M21 8V3h-5M3 16v5h5" stroke-linecap="round"></path>
    <path d="M3 21l7-7M21 3l-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>,
  <svg fill="none" class="rubicons minimize" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
    <path d="M10 19v-5H5M14 5v5h5" stroke-linecap="round"></path>
    <path d="M3 21l7-7M21 3l-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>,
]

const FullSizeToggle = props => {

    return <div className={styles.container}
        onClick={() => {
            props.fullSizeToggle();
        } }>
      {props.isFullSize? svg[1]: svg[0]}
    </div>
}

export default FullSizeToggle;
