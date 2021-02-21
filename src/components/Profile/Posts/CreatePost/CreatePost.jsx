import React from 'react';
import {reduxForm, Field} from 'redux-form';
import styles from './CreatePost.module.css';

import {TextArea, Button, ErrorForm, InputImage2} from '../../../commons/FormsControls/FormsControls';
import {maxLengthOrNothingCreator} from '../../../../utils/validators.js';

let svg = [
  <svg xmlns="http://www.w3.org/2000/svg" class="rubicons pencil-write" width="36" height="36" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
    <path d="M3 21h18M12.8889 5.5556l3.5555 3.5555M7.5556 18L20 5.5556 16.4444 2 4 14.4444V18h3.5556z" stroke-linecap="round"></path>
  </svg>,
];

let maxLengthOrNothing650 = maxLengthOrNothingCreator(650);

class CreatePost extends React.Component {

  render () {

    let choose_photo_button = React.createRef();
    let choosed_file_name = React.createRef();

    return <form className={styles.form} onSubmit={this.props.handleSubmit} >
      <div className={styles.input_wrapper} >
        <div className={styles['input-text-wrp']}>
          <Field name='create_post' autoFocus={true} 
            validate={[maxLengthOrNothing650]}
            component={TextArea} 
            placeholder=' Enter your posts' />
        </div>
        <div className={styles.server_response}>
          <ErrorForm message={this.props.error} />
        </div>
      </div>
      <div className={styles['choose-button-wrp']}>
        <Field name="picture" component={InputImage2} 
          choose_photo_button={choose_photo_button}
          choosed_file_name={choosed_file_name}
          type="file" value={null} />
        <button ref={choose_photo_button} className={styles['choose-button']}>
          {svg[0]}
        </button>
        <div className={styles['choosed-file-name']} ref={choosed_file_name}>
          no file choosen
        </div>
      </div>
      <div>
        <button className={'commons-modal-button ' + 
            styles['create-post-button']}
          error={this.props.error} name={'Create post'} 
          type='submit' 
          disabled={this.props.is_fetching}>
          POSTED
        </button>
      </div>
    </form>
  }
};

export default reduxForm({form: 'create_post'})(CreatePost); 


