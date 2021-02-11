import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthDataActionCreator, login} from '../../reducers/authReducer.js';
import {setEditMode, setLeft, toggleEditMode} from '../../reducers/sidebarReducer.js';
import styles from './Sidebar.module.css';
import MenuItem from './MenuItem/MenuItem.jsx';
import AuthInfo from './AuthInfo/AuthInfo.jsx';

import btnBlack from '../../assets/images/menu_black.png';


class Sidebar extends React.Component {

  componentWillUpdate(nextProps, nextState) {

    if(this.props.auth && this.props.profile
      && this.props.profile.id == this.props.auth.id
      && this.props.auth.photo != nextProps.profile.photos.small
      && !this.props.auth.is_fetching
    ){
      this.props.login({
        email: this.props.auth.email,
        password: '111111'
      })
    }
  }

  componentWillUnmount () {
    this.props.setLeft(-260);
    this.props.setEditMode(false);
  }

  toggleEditMode = (content) => {
    this.props.setEditMode(!this.props.editMode);
  }

  render () {
    const maxLeft = -260;

    let animation = this.props.auth.is_auth ? 
      styles.after_auth_position:
      this.props.auth.is_authed && styles.after_unauth_position || styles.before_auth_position;

    let content = React.createRef();

    setTimeout( () => {
      let rubicon = -70;
      if(this.props.editMode && this.props.left !== 0) {
        if(this.props.left < -230) {
          this.props.setLeft(-230)
        } else if (this.props.left > -5) {
          this.props.setLeft(0);
        } else {
          this.props.setLeft(this.props.left + 15);
        }
      } else if (!this.props.editMode && this.props.left !== -260 ){
        if(this.props.left > -250) {
          this.props.setLeft(this.props.left - 15);
        } else {
          this.props.setLeft(-260);
        }
      }
    }, 10 );
    return <div className={styles.wrp}> 
      <div ref={content} className={styles.content}
        style={ { left: this.props.left } }>
        <div>
          <AuthInfo setAuthData={this.props.setAuthData}/>
          <nav className={`${styles.menu_item} `}>
            <MenuItem {...this.props} link={`/profile/${this.props.auth.id}/posts`} text='Profile' />
            <MenuItem {...this.props} link={`/messages/${this.props.auth.id}/`} text='Messages' />
            <MenuItem {...this.props} link='/users' text='Users' />
          </nav>
          <button className={styles['toggle-edit-button']}
            onClick={ (e) => {
            this.toggleEditMode(content);
            } }>
            <img src={btnBlack} />
          </button>
        </div>
      </div>
    </div>
  }
};

const mapsStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profilePage.profile,
    photo: state.auth.photo,
    editMode: state.sidebar.editMode,
    left: state.sidebar.left,
  };
};

const mapsDispatchToProps = {
  setAuthData: setAuthDataActionCreator,
  login,
  setEditMode,
  setLeft,
  toggleEditMode,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(withRouter(Sidebar));
