import React from 'react';
import styles from './App.module.css';
import './index.css';

import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

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
let arr = [];

class App extends React.Component {
  componentDidMount() {

  }

  render() {

    return (
      <BrowserRouter>
        <div className={styles.app} >

          <div className={styles.wrp}>

            <div>
              { this.props.auth.is_auth && <Sidebar/> }
            </div>

            <div>
              <Notification />
              <Route path='/' render={() => <Redirect to='/profile' /> } />
              <Route component={Profile} path='/profile/:user_id?'/>
              <Route component={Messages} path='/messages/:user_id?/' />
              <Route component={Users} path='/users' />
              <Route component={News} path='/news' />
              <Route component={Music} path='/music' />
              <Route component={Settings} path='/settings' />
              <Route component={SignUp} path='/signup' />
              <Route component={SignIn} path='/signin' />
            </div>

          </div>

        </div>
      </BrowserRouter>
    );
  }
}


export default compose(
  connect(() => {}, {setWsActionCreator}),
  WithAuthData)
(App);
