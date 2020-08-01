import React from 'react';
import styles from './UserItem.module.css';
import {profileApi} from '../../../api/api';
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
                    <img src={avatar_default} />
                </div>
                <div className={styles.name_wrp}>
                    <div className={styles.name}>
                        {this.props.name}
                    </div>
                </div>
                <div className={styles.follow_btn}>
                    <button />
                </div>
            </div>
        </div>
    }
}

export default UserItem;
