import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import styles from './Posts.module.css';
import default_avatar from '../../../../assets/images/avatar_default.png';
import Post from './Post/Post.jsx';

import {TextArea, Button} from '../../../commons/FormsControls/FormsControls';
import {minLengthCreator, maxLengthCreator} from '../../../../utils/validators.js';
import {getPosts} from '../../../../reducers/profileReducer';

let minLength10 = minLengthCreator(10);
let maxLength30 = maxLengthCreator(30);

class Posts extends React.Component {

    componentDidMount() {

        let options = {
            user_id: this.props.auth.id, 
        }
        this.props.getPosts(options);
    }

    onSubmit = (post) => {
        console.log(post);

    };

    render() {
        let posts = [];
        if(this.props.posts){
            posts = this.props.posts.map( (item) =>  
                (<Post avatar={default_avatar} message={item.message} likes={item.likes} ></Post>) 
            );
        }

        return (
            <div>
                <CreatePostForm onSubmit={this.onSubmit} />
                <div className={styles.posts}>
                    {posts}
                </div>

            </div>
        );
    }
};

let mapsStateToProps = (state) => ({
    textNewPost: state.profilePage.textNewPost,
    posts: state.profilePage.posts,
    auth: state.auth,
});

let mapsDispatchToProps = {
    getPosts
};

class CreatePost extends React.Component {

    render () {
        return <>
            <form onSubmit={this.props.handleSubmit} >
                <div>
                        {/*validate={[minLength10, maxLength30]}*/}
                    <Field name='create_post' autoFocus={true} 
                        component={TextArea} 
                        placeholder=' Enter your posts' />
                    </div>
                    <div>
                        <Button error={this.props.error} name={'Sign In'} type='submit' 
                            disabled={this.props.is_fetching}/>
                        </div>
                    </form>
            </>
    }
};

let CreatePostForm = reduxForm({form: 'create_post'})(CreatePost); 

export default connect(mapsStateToProps, mapsDispatchToProps)(Posts); 


