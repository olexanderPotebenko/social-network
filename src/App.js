import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
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

function App(props) {

    return (
        <BrowserRouter>
            <div className='app'>
                <div></div>
                <div className='wrapper'>

                    {/*<HeaderContainer />*/}
                    <Sidebar/> 

                    <div className='content_wrapper'>
                        <div className='content' >
                            <Route path='/' render={() => <Redirect to='/profile' /> } />
                            <Route component={Profile} path='/profile/:user_id?'/>
                            <Route component={Messages} path='/messages/:user_id?' />
                            <Route component={Users} path='/users' />
                            <Route component={News} path='/news' />
                            <Route component={Music} path='/music' />
                            <Route component={Settings} path='/settings' />
                            <Route component={SignUp} path='/signup' />
                            <Route component={SignIn} path='/signin' />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </BrowserRouter>
    );
}


export default App;
