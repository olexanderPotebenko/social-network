import React from 'react';
import styles from './FollowButton.module.css';
import {connect} from 'react-redux';
import {followApi} from '../../../api/api';
import {setSubscribed, follow, unfollow} from '../../../reducers/authReducer';

class FollowButton extends React.Component {

  state = {
    isFetching: false,
    followed: undefined,
  }

  componentDidMount() {

    let followed = this.props.subscribed.map(user => user.id).includes(this.props.user.id);
    this.setState({ followed });
  }

  setIsFetching = isFetching => {
    this.setState({isFetching})
  }
  setIsFollow = isFollow => {
    this.setState({followed: isFollow});
  }


  onFollow () {
    let options = {
      id: this.props.auth.id,
      user_id: this.props.user.id,
      token: this.props.auth.token,
    };
    this.setState({isFetching: true});
    this.props.follow(
      options, this.props.user, this.setIsFetching.bind(this), this.setIsFollow.bind(this)
    );
  };

  onUnfollow () {
    let options = {
      id: this.props.auth.id,
      user_id: this.props.user.id,
      token: this.props.auth.token,
    };
    this.setState({isFetching: true});
    this.props.unfollow(
      options, this.props.user, this.setIsFetching.bind(this), this.setIsFollow.bind(this)
    );
  };

  isDisabled () {
    return this.state.isFetching;
  };

  render() {

    let stylesArr = ['commons-modal-button'];
    stylesArr.push(this.state.followed? styles.followed: styles.follow);

    return (
      <div className={styles.wrp}>
        <div className={styles.container}>
          { this.props.user.id == this.props.auth.id
              && <button className={'commons-modal-button ' + styles.me}
          disabled={true}>
          ME
        </button>
          || <button className={stylesArr.join(' ')}
            disabled={this.isDisabled()}
            onClick={ this.state.followed ? 
                this.onUnfollow.bind(this): this.onFollow.bind(this) }>
            {this.state.followed && 'FOLLOWED' || 'FOLLOW'}
          </button>
          }
      </div>
      </div>
    );
  }
};

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
    subscribed: state.auth.subscribed_to,
  }
};

export default connect(mapStateToProps, {setSubscribed, follow, unfollow})(FollowButton);
