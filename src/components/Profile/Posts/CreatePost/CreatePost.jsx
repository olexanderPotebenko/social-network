import React from 'react';
import {reduxForm, Field} from 'redux-form';
import styles from './CreatePost.module.css';

import {TextArea, Button, ErrorForm, InputImage2} from '../../../commons/FormsControls/FormsControls';
import {maxLengthOrNothingCreator} from '../../../../utils/validators.js';

let maxLengthOrNothing650 = maxLengthOrNothingCreator(650);

class CreatePost extends React.Component {

    render () {

        let choose_photo_button = React.createRef();
        let choosed_file_name = React.createRef();

    return <div className={styles.wrapper} >
        <form className={styles.form} onSubmit={this.props.handleSubmit} >
            <div className={styles.input_wrapper} >
                <div className={styles['input-text-wrp']}>
                    <Field name='create_post' autoFocus={true} 
                        validate={[maxLengthOrNothing650]}
                        component={TextArea} 
                        placeholder=' Enter your posts' />
                    </div>
                </div>
                <div className={styles.server_response}>
                    <ErrorForm message={this.props.error} />
                </div>
                <Field name="picture" component={InputImage2} 
                    choose_photo_button={choose_photo_button}
                    choosed_file_name={choosed_file_name}
                    type="file" value={null} />
                    <div className={styles['choose-photo-button-wrp']}>
                        <button ref={choose_photo_button}>
                            CHANGE PHOTO
                        </button>
                        <div className={styles['choosed-file-name']}>
                            <div className={styles['choosed-file-name-wrp']}>
                                <span ref={choosed_file_name}>
                                    no file choosen
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className={'commons-modal-button ' + 
                            styles['create-post-button']}
                        error={this.props.error} name={'Create post'} 
                        type='submit' 
                        disabled={this.props.is_fetching}>
                        CREATE POST
                    </button>
                </form>
            </div>
    }
};

export default reduxForm({form: 'create_post'})(CreatePost); 


