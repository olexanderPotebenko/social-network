import React from 'react';
import styles from './BackButton.module.css';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

import backImg from '../../../assets/images/back.png';

const BackButton = (props) => {

  return <button className={styles['back-button']}
    onClick={() => {
      debugger;
      props.history.goBack();
      props.func();
    } } >
    <img src={backImg} />
  </button>
}

export default compose(
  withRouter
)(BackButton);



