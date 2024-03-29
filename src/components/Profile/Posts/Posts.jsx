import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import styles from './Posts.module.css';
import default_avatar from '../../../assets/images/avatar_default.png';

import {getPosts, createPost} from '../../../reducers/profileReducer';
import Post from './Post/Post.jsx';

import {TextArea, Button} from '../../commons/FormsControls/FormsControls';
import Anchor from '../../commons/Anchor/Anchor';
import Modal from '../../commons/Modal/Modal';
import ListIsEmpty from '../../commons/ListIsEmpty/ListIsEmpty';
import CreatePost from './CreatePost/CreatePost';
import FetchingToggle from '../../commons/FetchingToggle/FetchingToggle.jsx';


class Posts extends React.Component {

  state = {
    postedModal: false,
  }

  componentDidMount() {
    let options = {
      user_id: this.props.profile.id, 
    }
    this.props.getPosts(options);
  }

  componentWillUpdate() {
    if(this.props.profile !== null){
      let route_profile = this.props.location.pathname
        .split('/').filter(item => item !== '')[1];
      let current_profile = this.props.profile.id;

      if(route_profile !== current_profile) {

        let options = {
          user_id: route_profile, 
        }

        this.props.getPosts(options);
      };
    };
  }

  onSubmit = (post) => {
    this.changeVisibleModal(false);
    let {id, token} = this.props.auth;
    let fd = new FormData();
    fd.append('text', post.create_post);
    fd.append('image', post.picture);
    let options = {
      id, token,
      post: fd,
    }
    this.props.createPost(options);
  };

  changeVisibleModal = ((bool) => this.setState({postedModal: bool})).bind(this);

  render() {

    let scrollbar = React.createRef();
    let posts = [];
    if(this.props.posts){
      posts = this.props.posts.map( (item) =>  {
        return (
          <Post avatar={default_avatar} 
            posts={this.props.posts}
            post={item} 
            auth={this.props.auth} 
            scrollbar={scrollbar}
            profile={this.props.profile}></Post>
        ) 
      }
      );
      posts.reverse();
    }

    return (
      <div className={styles.wrp} >
        <div style={ {position: 'absolute', bottom: 0, right: 30} }>
          <Anchor scrollbar={scrollbar} />
        </div>
        {
          this.state.postedModal && <Modal width={700} height={500} Component={CreatePost}
        changeVisibleModal={ this.changeVisibleModal }
        onSubmit={this.onSubmit} />
        }
      {
        this.props.auth.id == this.props.profile.id &&
          <div className={styles.create_post_button_wrapper}>
            <button className={styles.create_post_button}
              onClick={() => {this.changeVisibleModal(true)}} >
              CREATE NEW POST
            </button>
          </div>
      }
      <div ref={scrollbar} className={styles.scrollbar}>

        {
          this.props.postsIsFetching? 

            <div className={styles['fetching-wrp']}>
        <div className={styles['fetching']}>
          <FetchingToggle width={50} height={50}/>
        </div>
      </div>
          : posts.length > 0 && posts
          || <ListIsEmpty />
        }
      </div>
      </div>
    );
  }
};

let mapsStateToProps = (state) => ({
  postsIsFetching: state.profilePage.postsIsFetching,
  textNewPost: state.profilePage.textNewPost,
  profile: state.profilePage.profile,
  posts: state.profilePage.posts,
  auth: state.auth,
});

let mapsDispatchToProps = {
  getPosts,
  createPost,
};


export default connect(mapsStateToProps, mapsDispatchToProps)(Posts); 


