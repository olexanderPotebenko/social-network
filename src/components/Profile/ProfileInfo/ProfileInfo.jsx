import React from 'react';
import {connect} from 'react-redux';
import styles from './ProfileInfo.module.css';
import poster from '../../../assets/images/space.jpg';
import default_avatar from '../../../assets/images/avatar_default.png';


class ProfileInfo extends React.Component {

    render () {
        debugger;
        let profile = this.props.profile;

        let avatar = this.props.profile.photos.small || default_avatar;
        return (
            <div className={styles.wrapper}>
                <div className={styles.avatar}>
                    <img src={avatar} />
                </div>
                <ul className={styles['list-info']}>
                    <li>
                        <span className={styles['item-field']}>
                            name: 
                        </span>
                        <span className={styles['item-data']}>
                            {`      ${this.props.profile.name}`}
                        </span>
                    </li>
                    <li>
                        <span className={styles['item-field']}>
                            address:
                        </span>
                        <span className={styles['item-data']}>
                            {`      ${this.props.profile.address}`}
                        </span>
                    </li>
                    <li>
                        <span className={styles['item-field']}>
                            email:
                        </span>
                        <span className={styles['item-data']}>
                            {`      ${this.props.profile.email}`}
                        </span>
                    </li>
                    <li>
                        <span className={styles['item-field']}>
                            phone:
                        </span>
                        <span className={styles['item-data']}>
                            {`      ${this.props.profile.phone}`}
                        </span>
                    </li>
                    <li>
                        <span className={styles['item-field']}>
                            status:
                        </span>
                        <span className={styles['item-data']}>
                            {`      ${this.props.profile.status}`}
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
};

export default connect(mapStateToProps, {})(ProfileInfo);
