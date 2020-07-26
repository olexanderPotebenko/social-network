import React from 'react';
import {reduxForm, Field} from 'redux-form';
import styles from './CreatePost.module.css';

import {TextArea, Button, ErrorForm, InputImage} from '../../../../commons/FormsControls/FormsControls';
import {minLengthCreator, maxLengthCreator} from '../../../../../utils/validators.js';

let minLength10 = minLengthCreator(10);
let maxLength650 = maxLengthCreator(650);

class CreatePost extends React.Component {

    render () {
        return <div className={styles.wrapper} >
            <form className={styles.form} onSubmit={this.props.handleSubmit} >
                <div className={styles.input_wrapper} >
                    <Field name='create_post' autoFocus={true} 
                        validate={[minLength10, maxLength650]}
                        component={TextArea} 
                        placeholder=' Enter your posts' />
                    </div>
                    <div className={styles.server_response}>
                        <ErrorForm message={this.props.error} />
                    </div>
                        <Field name="picture" component={InputImage} type="file" value={null} />
                    <div className={styles.button_wrapper}>
                        <Button error={this.props.error} name={'Create post'} type='submit' 
                            disabled={this.props.is_fetching}/>
                        </div>
                    </form>
                </div>
    }
};

export default reduxForm({form: 'create_post'})(CreatePost); 


