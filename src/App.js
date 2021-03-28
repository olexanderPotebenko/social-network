import React from 'react';
import styles from './App.module.css';
import './index.css';

import {withRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {CSSTransition} from 'react-transition-group';
//hocs
import WithAuthData from './hocs/WithAuthData';
//action creators
import {setWsActionCreator} from './reducers/authReducer';
//components
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Messages from './components/Messages/Messages.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';
import Users from './components/Users/Users.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import SignIn from './components/Auth/SignIn.jsx';
import Notification from './components/Notification/Notification.jsx';

class App extends React.Component {
  componentDidMount() {

  }

  render() {

    // if(!this.props.auth.is_auth && this.props.location.pathname != '/signin') {
    //   this.props.history.push('/signin');
    // }

    //{ path: '/', name: 'Home', Component: Home },
    let routeObjs = [
      { path: '/', render: () => <Redirect to='/signin' /> },
      { path: '/profile/:user_id?/', name: 'Profile', render: () => <Profile /> },
      { path: '/messages/:user_id?/', name: 'Messages', render: () => <Messages /> },
      { path: '/users', name: 'Users', render: () => <Users /> },
      { path: '/signup', name: 'SignUp', render: () => <SignUp /> },
      { path: '/signin', name: 'SignIn', render: () => <SignIn /> },
    ];

    let wrp = React.createRef();

    return <div className={styles.app} >

      <div className={styles.wrp}>

        <div>
          { this.props.auth.is_auth && <Sidebar/> }
        </div>

        <div ref={wrp}>
          <Notification />
          { routeObjs.map(({ path, render}) => {
            return <Route key={path} path={path}>
          {({ match }) => (
              <CSSTransition
              in={match != null}
          timeout={200}
          classNames='page'
          unmountOnExit >
          <div className='page'>
            {render()}
          </div>
        </CSSTransition>
          )}
      </Route>
          })
          }
    </div>

    </div>

      </div>
  }
}


export default compose(
  connect(() => {}, {setWsActionCreator}),
  WithAuthData)
(withRouter(App));
