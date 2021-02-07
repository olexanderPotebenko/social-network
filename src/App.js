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
let arr = [];

class App extends React.Component {
  componentDidMount() {
    let startWebSocketConnection = () => {
      let ws = new WebSocket('ws://127.0.0.1:8181');
      ws.onopen = (e) => {
        this.props.setWsActionCreator(ws);
        //alert("[open] Соединение установлено");
        //alert("Отправляем данные на сервер");
        ws.send(JSON.stringify({
          token: this.props.auth.token,
          id: this.props.auth.id,
          action: 'AUTH',
        }));
        let data = JSON.stringify({
          id: this.props.auth.id,
          action: 'SEND-MESSAGE',
          user_id: '',
        });

        ws.send(data);
      };

      ws.onmessage = (event) => {
        //alert(`[message] Данные получены с сервера: ${event.data}`);
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          //alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          //alert('[close] Соединение прервано');
          setTimeout(startWebSocketConnection, 2000);
        }
      };

      ws.onerror = (error) => {
        //alert(`[error] ${error.message}`);
      };
    };
    startWebSocketConnection();
  }

  render() {

    return (
      <BrowserRouter>
        <div className={styles.app} >

          <div className={styles.wrp}>

            <div>
            <Sidebar/> 
            </div>

            <div>
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
