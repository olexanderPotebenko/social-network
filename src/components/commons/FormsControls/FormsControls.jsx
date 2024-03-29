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
        <input className={input_styles} {...input} {...props} 
        ref={props.reference}/>
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
    <textarea {...input} {...props} 
      className='commons-font-for-input'
    />
    {error_heandler && <ErrorField error={meta.error} />}
    </div>
};

export const InputImage = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  change_photo_button,
  ...props 
}) => {

  let input = React.createRef();

  setTimeout(() => {
    if(change_photo_button.current){
      change_photo_button.current.addEventListener("click", () => {
        if(input.current) input.current.click();
      });
    };
  }, 100);

  const adaptFileEventToValue = delegate => e => {

    let fr = new FileReader();

    fr.addEventListener("load", function (e) {
      if(props.avatar_ref.current) props.avatar_ref.current.src = fr.result;
    }, false);

    if(e.target.files.length) fr.readAsDataURL(e.target.files[0]);
    return e.target.files[0]? delegate(e.target.files[0]): props.avatar_ref.current.src;
  };

  return <div>
    <input 
      ref={input}
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      accept='image/*'
      {...props.input}
      {...props}
      style={ {position: 'absolute', opacity: 0, width: 0, height: 0} }
    />
  </div>
}

export const InputImage2 = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  choose_photo_button,
  choosed_file_name,
  ...props 
}) => {

  let input = React.createRef();

  setTimeout(() => {
    if(choose_photo_button.current){
      choose_photo_button.current.addEventListener("click", (e) => {
        e.preventDefault();
        if(input.current) input.current.click();
      }, false);
    };
  }, 100);

  const adaptFileEventToValue = delegate => e => {

    if(choosed_file_name.current)
      choosed_file_name.current.innerText = e.target.files[0].name;

    return delegate(e.target.files[0]);
  };

  const onSelectImage= e => {
    const maxSize = 500000; //2MB
    let file = e.currentTarget.files[0];
    if(file.size > maxSize)
      return;
    adaptFileEventToValue(onChange)(e);
  };

  return <div className={styles['input-image2-wrp']}>
    <input 
      ref={input}
      onChange={onSelectImage}
      onBlur={adaptFileEventToValue(onBlur)}
      type="image"
      {...props.input}
      {...props}
      style={ {position: 'absolute', opacity: 0, width: 0, height: 0} }
    />
  </div>
}

