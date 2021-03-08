import React from 'react';
import toggle from '../../../assets/images/toggle.png';
import styles from './FetchingToggle.module.css';

let FetchingToggle = (props) => {
  let {
    height=30, width=30, 
    background='rgba(200, 200, 230, .2)', color='#bbb'
  } = props;

  return <div className={styles.wrp + ' ' + background}
    style={ {
      'background-color': background,
      color,
      width, height,
    } }>
    <svg fill="none" class="rubicons refresh" xmlns="http://www.w3.org/2000/svg" width={width-4} height={height-4} viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path d="M15 9h6V3" stroke-linecap="round"></path>
      <path d="M3 10c1.458-4.1 5-7 9-7a10.1192 10.1192 0 019 6" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M9 15H3v6" stroke-linecap="round"></path>
      <path d="M21 14c-1.458 4.1-4.8 7-9 7a10.3682 10.3682 0 01-9-6" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </div>
};

export default FetchingToggle;
