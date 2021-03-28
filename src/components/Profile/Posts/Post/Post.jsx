import React from 'react';
import {connect} from 'react-redux';
import {likedPost, deletePost} from '../../../../reducers/profileReducer';
import styles from './Post.module.css';
import {getFormatedDate} from '../../../../utils/functions';

import heart from '../../../../assets/images/heart.png';
import heart_fool from '../../../../assets/images/heart_fool.png';
import criss_cross from '../../../../assets/images/criss-cross.png';

import FetchingToggle from '../../../commons/FetchingToggle/FetchingToggle';
import FullSizeToggle from '../../../commons/FullSizeToggle/FullSizeToggle';
import FullSizeImage from '../../../commons/FullSizeImage/FullSizeImage';
import Modal from '../../../commons/Modal/Modal';
import UserItem from '../../../commons/UserItem/UserItem.jsx';
import CloseButton from '../../../commons/CloseButton/CloseButton.jsx';
import ListIsEmpty from '../../../commons/ListIsEmpty/ListIsEmpty.jsx';

import {profileApi} from '../../../../api/api.js';

class Post extends React.Component {

  componentDidMount() {
    if(!this.state.interval){
      let interval = setInterval(() => {
        // console.log(this.state.interval);
        if(this.state.imageWrp.current 
          && this.state.imageWrp.current.clientWidth != this.state.widthMax) {
          // console.log(this.state.widthMax);
          this.setState({widthMax: this.state.imageWrp.current.clientWidth});
        }
        if(this.state.img)
          this.fitImage();
      }, 500);
      this.setState({interval});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  state = {
    interval: undefined,
    imageWrp: React.createRef(),
    img: undefined,
    widthMax: 0,
    heightMax: 400,
    width: 0,
    height: 0,
    withPicture: !!this.props.post.picture,
    isLoadPicture: false, 

    like_fetching: false,
    isFullSize: false,
    showWhoLikedModal: false,
  }

  fitImage (e) {
    let width, height;
    width = this.state.imageWrp.current.clientWidth;
    // width = e.currentTarget.parentElement.clientWidth;
    height = width * this.state.img.height/ this.state.img.width;

    this.setState({width, height });
  };

  async onLikes (e) {
    let options = {
      id: this.props.auth.id,
      user_id: this.props.profile.id,
      token: this.props.auth.token,
      post_id: this.props.post.id,
    };

    this.setState({ like_fetching: true });
    await this.props.likedPost(options);
    this.setState({ like_fetching: false});

  };

  async onDelete(e) {
    let options = {
      id: this.props.auth.id,
      token: this.props.auth.token,
      post_id: this.props.post.id,
    };

    await this.props.deletePost(options);
  }

  isLiked () {
    return this.props.post.likes.includes(this.props.auth.id)? heart_fool: heart;
  }

  fullSizeToggle () {
    this.setState({isFullSize: !this.state.isFullSize})
  }

  showWhoLikedModalToggle () {
    this.setState({showWhoLikedModal: !this.state.showWhoLikedModal});
  }

  render () {
    window.localState = this.state;

    let users_ho_liked = this.props.post.likes.map(id => {
      return <div className={styles.user_ho_liked}></div>
    });

    return (
      <div className={styles.wrapper}>
        {
          this.props.auth.id === this.props.profile.id 
            && <a href='' onClick={(e) => { e.preventDefault() } }>
        <div className={styles.criss_cross} >
          <CloseButton close={this.onDelete.bind(this)} />
        </div>
      </a>
        }
        <div className={styles.date}>
          {getFormatedDate(this.props.post.date)}
        </div>
        <div className={styles.post}>
          <div ref={this.state.imageWrp} className={styles.post_picture_wrp}
            style={ {'max-height': this.state.heightMax} }>
            <div className={styles['full-size']}>
            <FullSizeToggle 
              isFullSize={this.state.isFullSize}
              fullSizeToggle={this.fullSizeToggle.bind(this)}/>
            </div>
            <img src={this.props.post.picture} className={styles.post_picture}
              onLoad={(e) => {
                let img = new Image();
                img.src = e.currentTarget.currentSrc;
                this.setState({img, isLoadPicture: true});
                //setTimeout(() => this.fitImage(e));
              } } 
              style={{
                width: '100%', height: this.state.isLoadPicture? 0:200,
              }}
            />
            <div style={ {
              'background-image': `url("${this.props.post.picture}")`,
              'background-repeat': 'no-repeat',
              'background-size': 'contain',
              'background-position': 'center',
              position: 'relative',
              width: this.state.width,
              height: this.state.height,
              }}>
          </div>
              { !this.state.isLoadPicture
                  && <div className={styles.fetching}>
              <FetchingToggle />
            </div>
            }
          </div>

          <div className={styles.text}>
            {this.props.post.text}
          </div>

          <div className={styles.likes} >
            <a href='' onClick={(e) => { e.preventDefault() }} >
              <div className={styles.count}>
                <div className={styles.text} 
                  onClick={this.showWhoLikedModalToggle.bind(this)}>
                  {this.props.post.likes.length}
                </div>
                <div className={styles.user_ho_liked_wrp} 
                  style={{'max-width': this.state.user_count_edit_mode && '120px' || '0px'}} >
                  {users_ho_liked.splice(0, 3)}
                  ...
                </div>
              </div>
            </a>
            <a href='' onClick={(e) => { e.preventDefault() }} >
              <div className={styles.heart} onClick={this.onLikes.bind(this)}> 
                {
                  !this.state.like_fetching 
                    && <img src={this.isLiked()} />
              || <FetchingToggle width={22} height={22}/>
              }
              </div>
            </a>
          </div>
        </div>
        {
          this.state.isFullSize
            && <FullSizeImage 
          fullSizeToggle={this.fullSizeToggle.bind(this)}
        posts={this.props.posts}
        picture={this.props.post.picture}
        width={this.state.width}
        height={this.state.height}
        isFullSize={this.state.isFullSize}
        />
        }
      {
        this.state.showWhoLikedModal 
          && <Modal 
            changeVisibleModal={this.showWhoLikedModalToggle.bind(this)}
            scrollbar={this.props.scrollbar}
            likes={this.props.post.likes}
            post_id={this.props.post.id}
            user_id={this.props.profile.id}
            Component={WhoLikedModal} />
      }
      </div>
    );
  }
};

class WhoLikedModal extends React.Component {
  componentDidMount() {
    this.setState({isFetching: true});
    let options = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
    };
    profileApi.getLikersPost(options)
      .then(data => {
        if(data.result_code == 0){
          // console.log('res' + data.users);
          this.setState({likers: data.users});
        }else{
        }
        this.setState({isFetching: false});
      });
  }

  state = {
    likers: [],
    isFetching: false,
  }

  render () {
    let users = this.state.likers.map(user => {
      return <UserItem user={user} 
        changeVisibleModal={() => {
          this.props.changeVisibleModal();
          this.props.scrollbar.current.scrollTop = 0;
        } }
      />
    });

    return <div className={styles['likers-wrp']}>
      <div className={styles.scrollbar} >
        {
          this.state.isFetching
            && <div className={styles.fetching}>
        <FetchingToggle />
      </div>
      ||( users.length
      && users
      || <ListIsEmpty />)
      }
    </div>
      </div>
  }
}

export default connect(() => {}, {likedPost, deletePost})(Post);

