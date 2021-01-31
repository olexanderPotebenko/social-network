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
import {sendMessage} from '../../reducers/messagesReducer';


//components
import Preloader from '../commons/Preloader/Preloader.jsx';
import DropDownMenu from '../commons/DropDownMenu/DropDownMenu';
import Posts from './Posts/Posts';
import Subscribers from './Subscribers/Subscribers';
import Subscribed from './Subscribed/Subscribed';
import Modal from '../commons/Modal/Modal';
import ProfileInfo from './ProfileInfo/ProfileInfo';



class Profile extends React.Component {

  state = {
    postedModal: false,
    scrollTop: 0,
  }

  componentDidMount() {
  }

  componentWillUpdate() {
  }

  changeVisibleModal = ((bool) => this.setState({postedModal: bool})).bind(this);


  render() {
    let selected = this.props.location.pathname.split('/').slice(-1)[0];

    if(!this.props.profile) {
      return <Preloader />;
    };
    let {status, name, photos, contacts, email} = this.props.profile;

    let posts_styles = [styles.menu_item, styles.separator];
    let subscribers_styles = [styles.menu_item, styles.separator];
    let subscribed_styles = [styles.menu_item];

    switch(selected) {
      case 'posts':
        posts_styles.push(styles.current_item);
        break;
      case 'subscribers':
        subscribers_styles.push(styles.current_item);
        break;
      case 'subscribed':
        subscribed_styles.push(styles.current_item);
        break;
    };

    posts_styles = posts_styles.join(' ');
    subscribers_styles = subscribers_styles.join(' ');
    subscribed_styles = subscribed_styles.join(' ');

    let drop_down_menu_items_arr = [
      {
        value: 'more info',
        onClick: ((e) => {
          e.preventDefault();
          this.changeVisibleModal(true)
        }).bind(this),
      },
      // {
      //     value: 'follow',
      //     onClick: () => alert('not implemented functionality'),
      // },
      // {
      //     value: 'follow',
      //     onClick: () => alert('not implemented functionality'),
      // },
      // {
      //     value: 'follow',
      //     onClick: () => alert('not implemented functionality'),
      // },

    ];
    if(this.props.auth.id !== this.props.profile.id){
      drop_down_menu_items_arr.push({
        value: 'send message',
        onClick: ((e) => {
          e.preventDefault();
          debugger;

          let options = {
            id: this.props.auth.id,
            token: this.props.auth.token,
            user_id: this.props.profile.id,
            message: {
              date: new Date(),
              text: '',
            },
          };
          alert(options.id + ' ' + options.user_id)

          this.props.history.push(`/messages/${this.props.auth.id}/send/${this.props.profile.id}`);
          this.props.sendMessage(options);
        }).bind(this),
      })
    }

    return <div className={'wrp'}>
      <div className={styles.header}>
        <nav className={styles.horizontal_menu}>
          <ul>
            <li >
              <NavLink className={posts_styles} 
                onClick={() => selected = 'posts'}
                to='posts' >
                POSTS
                {
                  ` ${this.props.posts.length}`
                }
              </NavLink>
            </li>
            <li>
              <NavLink  className={subscribers_styles} 
                onClick={() => selected = 'subscribers'}
                to='subscribers' >
                SUBSCRIBERS
                {
                  ` ${this.props.subscribers.length}`
                }
              </NavLink>
            </li>
            <li>
              <NavLink className={subscribed_styles} 
                onClick={() => selected = 'subscribed'}
                to='subscribed' >
                SUBSRIBED 
                {
                  ` ${this.props.subscribed.length}`
                }
              </NavLink>
            </li>
          </ul>
        </nav>
        <div 
          style={ {
            position: 'absolute',
            top: '5px', right: 40,
          } } >
          <DropDownMenu 
            drop_down_menu_items_arr={drop_down_menu_items_arr}/>
        </div>
        <div className={styles['profile-name']} >
          {this.props.profile.name}
        </div>
        {/*
                <div className={styles['profile-info']} >
                    <a href='' className={styles['profile-more-info']}
                        onClick={(e) => {
                            e.preventDefault();
                            this.changeVisibleModal(true)}
                        } >
                        more info
                    </a>
                </div>
                */}
      </div>
      {
        this.state.postedModal && <Modal width={800} height={420} 
      Component={ProfileInfo}
      changeVisibleModal={ this.changeVisibleModal } />

      }
      <div style={ {overflow: 'hidden' } }>
        <Route component={Posts} path={'/profile/:user_id/posts'} />
        <Route component={Subscribers} path={'/profile/:user_id/subscribers'}  />
        <Route component={Subscribed} path={'/profile/:user_id/subscribed'}  />
      </div>
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
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    subscribers: state.profilePage.profile && state.profilePage.profile.subscribers || [],
    subscribed: state.profilePage.profile && state.profilePage.profile.subscribed_to || [],
  };
};

export default compose(
  connect(mapsStateToProps, {getProfile, sendMessage}),
  WithAuthData,
  WithSignInRedirect,
)(withRouter(ProfileContainer));
