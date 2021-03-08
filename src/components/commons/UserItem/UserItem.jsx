import React from 'react';
import styles from './UserItem.module.css';
import {profileApi} from '../../../api/api';
import {NavLink} from 'react-router-dom';
import FollowButton from '../FollowButton/FollowButton';
import FetchingToggle from '../FetchingToggle/FetchingToggle.jsx';
import avatar_default from '../../../assets/images/avatar_default.png';

class UserItem extends React.Component {

  state = {
    id: this.props.user.id,
    photo: `http://localhost:8080/profile/${this.props.user.id}/avatar`,
    name: '',
    load: false,
  }

  componentDidMount() {
  }

  onError = () => {
    this.setState({photo: avatar_default});
    this.setState({load: true});
  }

  onLoad = () => {
    this.setState({load: true});
  }

  render() {

    return <div className={styles.wrp}>
      <div className={styles.container} >
        <div className={styles.avatar}>
          <NavLink to={`/profile/${this.props.user.id}/posts`}
            onClick={this.props.changeVisibleModal}>
            { !this.state.load
                && <div className={styles.fetching}>
            <FetchingToggle />
          </div>
            }
            <img src={this.state.photo} 
              onLoad={this.onLoad}
              onError={this.onError} />
          </NavLink>
        </div>

        <div className={styles['container-right']}>
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
    </div>
  }
}

export default UserItem;
