import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import styles from './Posts.module.css';
import default_avatar from '../../../../assets/images/avatar_default.png';
import Post from './Post/Post.jsx';
import CreatePost from './CreatePost/CreatePost';

import {TextArea, Button} from '../../../commons/FormsControls/FormsControls';
import Modal from '../../../commons/Modal/Modal';
import {getPosts, createPost} from '../../../../reducers/profileReducer';


class Posts extends React.Component {

    state = {
        postedModal: false,
    }

    componentDidMount() {

        let options = {
            user_id: this.props.auth.id, 
        }
        this.props.getPosts(options);
    }

    onSubmit = (post) => {
        this.changeVisibleModal(false);
        let {id, token} = this.props.auth;
        let options = {
            id, token, post: post.create_post,
        }
        this.props.createPost(options);

    };

    changeVisibleModal = ((bool) => this.setState({postedModal: bool})).bind(this);

    render() {
        let posts = [];
        if(this.props.posts){
            posts = this.props.posts.map( (item) =>  
                (<Post avatar={default_avatar} {...item}></Post>) 
            );
            posts.reverse();
        }

        return (
            <div>
                {
                    this.state.postedModal && <Modal width={500} height={300} Component={CreatePost}
                        changeVisibleModal={ this.changeVisibleModal }
                    onSubmit={this.onSubmit} />

                }
                        <div className={styles.create_post_button_wrapper}>
                            <button className={styles.create_post_button}
                                onClick={() => {this.changeVisibleModal(true)}} >
                                Create new post
                            </button>
                        </div>
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
    getPosts,
    createPost,
};


export default connect(mapsStateToProps, mapsDispatchToProps)(Posts); 


