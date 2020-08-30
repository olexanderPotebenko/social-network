import React from 'react';
import {connect} from 'react-redux';
import {likedPost, deletePost} from '../../../../reducers/profileReducer';
import styles from './Post.module.css';
import {getFormatedDate} from '../../../../utils/functions';
import heart from '../../../../assets/images/heart.png';
import heart_fool from '../../../../assets/images/heart_fool.png';
import criss_cross from '../../../../assets/images/criss-cross.png';
import FetchingToggle from '../../../commons/FetchingToggle/FetchingToggle';

class Post extends React.Component {

    state = {
        widthMax: 900,
        widthMin: 700,
        width: 0,
        height: 0,
        like_fetching: false,
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
                    {console.log(this.props.post.picture)}
                    <div className={styles.post_picture_wrp}>
                        <img src={this.props.post.picture} className={styles.post_picture}
                            onLoad={this.fitImage.bind(this)} 
                            style={{
                                width: this.state.width,
                                height: this.state.height,
                            }}
                        />
                            </div>

                            <div className={styles.text}>
                                {this.props.post.text}
                            </div>

                            <div className={styles.likes} >
                                <a href='' onClick={(e) => { e.preventDefault() }} >
                                    <div className={styles.count}>
                                        <div className={styles.text} >
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
                    </div>
        );
    }
};

export default connect(() => {}, {likedPost, deletePost})(Post);

