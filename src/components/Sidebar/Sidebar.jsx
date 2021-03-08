import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthDataActionCreator, login} from '../../reducers/authReducer.js';
import {setEditMode, setLeft, toggleEditMode, setShadingDisplay} from '../../reducers/sidebarReducer.js';
import styles from './Sidebar.module.css';
import MenuItem from './MenuItem/MenuItem.jsx';
import AuthInfo from './AuthInfo/AuthInfo.jsx';

import btnBlack from '../../assets/images/menu_black.png';

let svg = [
  <svg fill="none" class="rubicons user" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
    <path d="M12 13c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5 2.2386 5 5 5zM3 21a8.9999 8.9999 0 016.53-8.65M14.47 12.35A9.0001 9.0001 0 0121 21" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>,
  <svg fill="none" class="rubicons chat-message" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
    <path d="M7.936 7.797h8M7.936 11.797h6M21 16.797h-8l-6 4v-4H3v-14h18v14z" stroke-miterlimit="10" stroke-linecap="round"></path>
  </svg>,
  <svg fill="none" class="rubicons users" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
    <path d="M10.412 15.706c2.3389 0 4.235-1.8961 4.235-4.235 0-2.339-1.8961-4.235-4.235-4.235-2.339 0-4.235 1.896-4.235 4.235 0 2.3389 1.896 4.235 4.235 4.235zM3 21a7.384 7.384 0 014.256-6.7M13.567 14.3a7.3848 7.3848 0 014.257 6.7M16.31 10.26A7.3253 7.3253 0 0121 16.82" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M14.61 10.95A4 4 0 1010 7a2.2636 2.2636 0 00.01.26" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>,
];


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
        this.props.setShadingDisplay('block');
        if(this.props.left < -230) {
          this.props.setLeft(-230)
        } else if (this.props.left > -5) {
          this.props.setLeft(0);
        } else {
          this.props.setLeft(this.props.left + 15);
        }
      } else if (!this.props.editMode && this.props.left !== -260 ){
        this.props.setShadingDisplay('none');
        if(this.props.left > -250) {
          this.props.setLeft(this.props.left - 15);
        } else {
          this.props.setLeft(-260);
        }
      }
    }, 10 );
    return <div className={styles.wrp}> 
      <div className={styles.shading}
        onClick={ () => {this.props.setEditMode(false)}} 
        style={ {display: this.props.shadingDisplay} }></div>
      <div ref={content} className={styles.content}
        style={ { left: this.props.left } } >
        <div>
          <AuthInfo setAuthData={this.props.setAuthData} setEditMode={this.props.setEditMode} />
          <nav className={`${styles.menu_item} `}>
            <MenuItem {...this.props} link={`/profile/${this.props.auth.id}/posts`} text='Profile' 
              img={svg[0]}/>
            <MenuItem {...this.props} link={`/messages/${this.props.auth.id}/`} text='Messages' 
            img={svg[1]}/>
            <MenuItem {...this.props} link='/users' text='Users' 
            img={svg[2]}/>
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
    shadingDisplay: state.sidebar.shadingDisplay,
  };
};

const mapsDispatchToProps = {
  setAuthData: setAuthDataActionCreator,
  login,
  setEditMode,
  setLeft,
  toggleEditMode,
  setShadingDisplay,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(withRouter(Sidebar));
