import React from 'react';
import styles from './UserItem.module.css';
import {profileApi} from '../../../api/api';
import {NavLink} from 'react-router-dom';
import FollowButton from '../FollowButton/FollowButton';
import avatar_default from '../../../assets/images/avatar_default.png';

class UserItem extends React.Component {
    
    state = {
        id: this.props.id,
        photo: '',
        name: '',
    }

    componentDidMount() {

    }

    render() {

        return <div className={styles.wrp}>
            <div className={styles.container} >
                <div className={styles.avatar}>
                    <NavLink to={`/profile/${this.props.user.id}/posts`}>
                        <img src={avatar_default} />
                    </NavLink>
                </div>
                <div className={styles.name_wrp}>
                    <div className={styles.name}>
                        {this.props.user.name}
                    </div>
                </div>
                <div className={styles.follow_btn}>
                    <FollowButton key={this.props.user.id} user={this.props.user} />
                </div>
            </div>
        </div>
    }
}

export default UserItem;
