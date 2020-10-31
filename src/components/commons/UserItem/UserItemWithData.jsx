import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './UserItem.module.css';
import {profileApi} from '../../../api/api';
import avatar_default from '../../../assets/images/avatar_default.png';
import FollowButton from '../FollowButton/FollowButton';

class UserItem extends React.Component {
    
    state = {
        id: this.props.id,
        photo: '',
        name: '',
    }

    componentDidMount() {

    }

    render() {
        let avatar = avatar_default;

        if(this.props.user.photos.small) avatar = this.props.user.photos.small;

        return <div className={styles.wrp}>
            <div className={styles.container} >
                <div className={styles.avatar}>
                    <NavLink to={`/profile/${this.props.user.id}/posts`}>
                    <img src={avatar} />
                </NavLink>
                </div>
                <div className={styles.name_wrp}>
                    <div className={styles.name}>
                        {this.props.user.name}
                    </div>
                </div>
                <div className={styles.follow_btn}>
                    <FollowButton key={this.props.user.id} user={this.props.user}/>
                </div>
            </div>
        </div>
    }
}

export default UserItem;
