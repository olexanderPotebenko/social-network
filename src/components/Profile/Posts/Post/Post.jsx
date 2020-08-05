import React from 'react';
import {connect} from 'react-redux';
import {likedPost, deletePost} from '../../../../reducers/profileReducer';
import styles from './Post.module.css';
import {getFormatedDate} from '../../../../utils/functions';
import heart from '../../../../assets/images/heart.png';
import criss_cross from '../../../../assets/images/criss-cross.png';

class Post extends React.Component {

    state = {
        widthMax: 900,
        widthMin: 700,
        width: 0,
        height: 0,
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

    onLikes (e) {
        let options = {
            id: this.props.auth.id,
            user_id: this.props.profile.id,
            token: this.props.auth.token,
            post_id: this.props.post.id,
        };

        this.props.likedPost(options);

    };

    onDelete(e) {
        let options = {
            id: this.props.auth.id,
            token: this.props.auth.token,
            post_id: this.props.post.id,
        };

        this.props.deletePost(options);
    }

    render () {
        window.localState = this.state;
        return (
            <div className={styles.wrapper}>
                {
                    this.props.auth.id === this.props.profile.id 
                    && <div className={styles.criss_cross} onClick={this.onDelete.bind(this)}>
                        <img src={criss_cross} />
                    </div>
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

                        <div className={styles.likes} onClick={this.onLikes.bind(this)}>
                            <div className={styles.count}>
                                {this.props.post.likes.length}
                            </div>
                            <img src={heart} />
                        </div>
                    </div>
                </div>
        );
    }
};

export default connect(() => {}, {likedPost, deletePost})(Post);

