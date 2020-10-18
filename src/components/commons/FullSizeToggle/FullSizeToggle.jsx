import React from 'react';
import styles from './FullSizeToggle.module.css';
import fullSize from '../../../assets/images/full-size.png';

const FullSizeToggle = props => {

    return <div className={styles.container}
        onClick={() => {
            props.fullSizeToggle();
        } }>
        <img src={fullSize} />
    </div>
}

export default FullSizeToggle;
