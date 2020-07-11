import React from 'react';
import styles from './ProfileInfo.module.css';
import Status from './Status.jsx';
import poster from '../../../assets/images/space.jpg';
import default_avatar from '../../../assets/images/avatar_default.png';

const ProfileInfo = ({photos, name, status, email}) => {

    let photo = photos && photos.small ? photos.small : default_avatar;
    return (
        <div className={styles.wrapper}>
            {/*<img src={poster} className={styles.poster} />*/}

            <div className={styles.content}>
                <img className={styles.avatar} src={photo} />
                <div className={styles.description}>
                    <div>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.address}>Ukraine, Dnipro</span>
                    </div>
                    <span className={styles.email}>{email}</span>
                    <span className={styles.phone}>+88002553535</span>
                    <Status status={status}/>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
