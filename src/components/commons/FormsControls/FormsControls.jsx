import React from 'react';
import styles from './FormsControls.module.css';

export const Input = ({input, meta, ...props}) => {

    let input_styles = [styles.input];
    let error_heandler = meta.touched && !meta.active && meta.error;
    let success_handler = meta.touched && !meta.active && !meta.error;
    if(error_heandler)
        input_styles.push(styles.input_error);
    else if(success_handler)
        input_styles.push(styles.input_success);

    input_styles = input_styles.join(' ');

    return <>
        <div className={styles.input_wrapper}>
            <div className={styles.input_container}>
            <div className={styles.required_payload} >
                { (input.name[0].toUpperCase() + input.name.slice(1))
                    .split('')
                        .map(item => item == '_'? ' ': item)}
            </div>
            <input className={input_styles} {...input} {...props}/>
        {error_heandler && <ErrorField error={meta.error} />}
        </div>
        </div>
        </>
};

export const Button = ({type, name, disabled}) => {

    return <div className={styles.button_wrapper} >
        <button className={styles.button} disabled={disabled} 
            type={type}>{name}</button>
        </div>
};

const ErrorField = ({error}) => {

    return <div className={styles.field_error_wrapper}>
        <span className={styles.field_error}> {error} </span>
    </div>
};

export const ErrorForm = ({message}) => {
    return <div>
        {
            message && <>
                <div className={styles.error_form}>
                    <span className={styles.error_form_text}> {message} </span>
                </div>
                </>
        }
            </div>
};

export const TextArea = ({input, meta, ...props}) => {

    let input_styles = [styles.input];
    let error_heandler = meta.touched && !meta.active && meta.error;
    let success_handler = meta.touched && !meta.active && !meta.error;
    if(error_heandler)
        input_styles.push(styles.input_error);
    else if(success_handler)
        input_styles.push(styles.input_success);

    return <div className={styles.textarea_wrapper}>
        <textarea {...input} {...props} />
        {error_heandler && <ErrorField error={meta.error} />}
    </div>
};

