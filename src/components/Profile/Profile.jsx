import React from 'react';
import styles from './Profile.module.css';
import {connect} from 'react-redux';
import {NavLink, Route} from 'react-router-dom';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../../reducers/profileReducer.js';

//hocs
import WithAuthData from '../../hocs/WithAuthData.jsx';
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';

//reducers
import {sendMessage, getDialogs, selectDialog} from '../../reducers/messagesReducer';

//components
import Preloader from '../commons/Preloader/Preloader.jsx';
import DropDownMenu from '../commons/DropDownMenu/DropDownMenu';
import Posts from './Posts/Posts';
import Subscribers from './Subscribers/Subscribers';
import Subscribed from './Subscribed/Subscribed';
import Modal from '../commons/Modal/Modal';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import BackButtom from '../commons/BackButton/BackButton.jsx';
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle.jsx';
import Avatar from '../commons/Avatar/Avatar.jsx';

import avatar from '../../assets/images/avatar_default.png';


class Profile extends React.Component {

  state = {
    postedModal: false,
    scrollTop: 0,
    load: false,
  }

  componentDidMount() {
  }

  componentWillUpdate() {
  }

  changeVisibleModal = ((bool) => this.setState({postedModal: bool})).bind(this);

  onLoad = () => {
    this.setState({load: true});
  }
  onError = () => {
    this.setState({load: true, photo: avatar});
  }

  render() {

    if(!this.props.profile) {
      return <Preloader />;
    };
    let {status, name, photos, contacts, email} = this.props.profile;

    let menu_items = [
      {
        value: 'more info',
        onClick: ((e) => {
          this.changeVisibleModal(true)
        }).bind(this),
      },
      {
        value: 'subscribers',
        onClick: (e => {
          this.props.history.push(`/profile/${this.props.profile.id}/subscribers/`);
        }).bind(this),
      },
      {
        value: 'subscribed',
        onClick: (e => {
          this.props.history.push(`/profile/${this.props.profile.id}/subscribed/`);
        }).bind(this),
      },
    ];

    if(this.props.auth.id !== this.props.profile.id){
      menu_items.push({
        value: 'send message',
        onClick: ((e) => {

          let options = {
            id: this.props.auth.id,
            token: this.props.auth.token,
            user_id: this.props.profile.id,
            message: {
              date: new Date(),
              text: '',
            },
          };

          this.props.history.push(`/messages/${this.props.auth.id}/`);
          this.props.selectDialog('');
          this.props.sendMessage(options);
          this.props.getDialogs(options);
        }).bind(this),
      });
    };

    return <div className={styles.wrp} >

      <div className={styles['header-wrp']}>
        <div className={styles.header}

          style={ (() => {
            return !this.props.history.location.pathname.split('/').includes('posts')? 
              {'grid-template-columns': '80px 1fr 90px'}: {'grid-template-columns': '1fr 90px'}
          })() } >

          {
            !this.props.history.location.pathname.split('/').includes('posts') &&
              <div>
              <BackButtom func={(()=>{
                this.props.history.push(`/profile/${this.props.profile.id}/posts/`);
          }).bind(this)}/>
        </div>
      }

      <div className={styles['user-info']}>
        <div className={styles.avatar}>
          <Avatar id={this.props.profile.id} />
       </div>

        <div className={styles['profile-name']} >
          <h5>
            {this.props.profile.name}
          </h5>
        </div>
      </div>

      <div>
        <div >
          <DropDownMenu 
            items={menu_items}/>
        </div>
      </div>

      </div>
      </div>

      <div>
        <Route component={Posts} path={'/profile/:user_id/posts'} />
        <Route component={Subscribers} path={'/profile/:user_id/subscribers'}  />
        <Route component={Subscribed} path={'/profile/:user_id/subscribed'}  />
      </div>
      {
        this.state.postedModal && <Modal width={800} height={420} 
          Component={ProfileInfo}
          changeVisibleModal={this.changeVisibleModal} />
      }
    {
      this.props.profileIsFetching
        && 
          <div className={styles['fetching-wrp']}>
            <div className={styles['fetching']}>
              <FetchingToggle width={50} height={50}/>
            </div>
          </div>
    }
      </div>
  }
};


class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount () {

    let user_id = this.props.match.params.user_id;
    user_id = user_id;
    let options = {
      user_id,
      id: this.props.auth? this.props.auth.id: '',
      token: this.props.auth? this.props.auth.token: '',
    };
    this.props.getProfile(options);
  }

  componentWillUpdate(props) {

    if(props.profile !== null){
      let route_profile = props.location.pathname
        .split('/').filter(item => item !== '')[1];
      let current_profile = props.profile.id;

      if(route_profile !== current_profile) {
        let user_id = route_profile;
        let options = {
          user_id,
          id: this.props.auth? this.props.auth.id: '',
          token: this.props.auth? this.props.auth.token: '',
        };
        this.props.getProfile(options);
      };
    };
  }

  render() {

    return <Profile {...this.props} />
  }
}

let mapsStateToProps = (state) => {
  return {
    profileIsFetching: state.profilePage.profileIsFetching,
    postsIsFetching: state.profilePage.postsIsFetching,
    profile: state.profilePage.profile,
    id: state.profilePage.profile && state.profilePage.profile.id,
    posts: state.profilePage.posts,
    subscribers: state.profilePage.profile && state.profilePage.profile.subscribers || [],
    subscribed: state.profilePage.profile && state.profilePage.profile.subscribed_to || [],
  };
};

export default compose(
  connect(mapsStateToProps, {getProfile, sendMessage, getDialogs, selectDialog}),
  WithAuthData,
  WithSignInRedirect,
)(withRouter(ProfileContainer));
