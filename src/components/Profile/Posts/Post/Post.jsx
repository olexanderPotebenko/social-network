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

import {profileApi} from '../../../../api/api.js';

class Post extends React.Component {

    state = {
        widthMax: 900,
        widthMin: 700,
        heightMax: 400,
        width: 0,
        height: 0,
        like_fetching: false,
        isFullSize: false,
        showWhoLikedModal: false,
    }

    fitImage (e) {
        let img = new Image();
        img.src = e.target.currentSrc;
        let width, height;
        if(true){
            width = e.currentTarget.parentElement.clientWidth;
            height = width * img.height/ img.width;
        }else if(img.width < this.state.widthMin){
            width = this.state.widthMin;
            height = this.state.widthMin * img.height / img.width;
        }else if(img.width < this.state.widthMax){
            width = img.width;
            height = img.height;
        }else{

            width = this.state.widthMax;
            height = this.state.widthMax * img.height / img.width;
        };

        this.setState({ width, height });

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
                        <div className={styles.criss_cross} onClick={this.onDelete.bind(this)}>
                            <img src={criss_cross} />
                        </div>
                    </a>
                }
                    <div className={styles.date}>
                        {getFormatedDate(this.props.post.date)}
                    </div>
                    <div className={styles.post}>
                        <div className={styles.post_picture_wrp}
                            style={ {'max-height': this.state.heightMax} }>
                            <FullSizeToggle 
                                fullSizeToggle={this.fullSizeToggle.bind(this)}/>
                                <img src={this.props.post.picture} className={styles.post_picture}
                                    onLoad={this.fitImage.bind(this)} 
                                    style={{
                                        width: 0, height: 0,
                                    }}
                                />
                                        <div style={ {
                                            'background-image': `url("${this.props.post.picture}")`,
                                            'background-repeat': 'no-repeat',
                                            'background-size': 'cover',
                                            'background-position': 'center',
                                            position: 'relative',
                                            width: this.state.width,
                                            height: this.state.height,
                                        }}>
                                        </div>
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
                || <FetchingToggle />
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
                    />
            }
                        {
                            this.state.showWhoLikedModal 
                                && <Modal width={800} 
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
                    console.log('res' + data.users);
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

        let height = users.length > 4? 570: users.length * 130 + 50; // 130 * n + 50
        console.log(this.props);
        return <div className={'custom_scroll_bar'}
            style={ {
                width: '100%',
                height, 
            } }>
            {
                users.length
                && users
                || <span style={ {
                    width: '100%',
                    height: '100%',
                } }>
                    list is empty
                </span>
            }
        </div>
    }
}

export default connect(() => {}, {likedPost, deletePost})(Post);

