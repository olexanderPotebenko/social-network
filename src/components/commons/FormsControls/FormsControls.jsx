import React from 'react';
import styles from './FormsControls.module.css';

export const Input = ({input, meta, ...props}) => {


    let error_heandler = meta.touched && !meta.active && meta.error;
    let input_styles = error_heandler && styles.input_error;
    return <div>
        <div>
            <input className={input_styles} {...input} {...props}/>
        </div>
        {error_heandler && <span className={styles.error} >{meta.error}</span>}
    </div>
};

