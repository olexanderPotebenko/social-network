import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Messages from './components/Messages/Messages.jsx';
import News from './components/News/News.jsx';
import Music from './components/Music/Music.jsx';
import Settings from './components/Settings/Settings.jsx';

function App(props) {

    let ProfileData = () => ( 
        <Profile />); 
    let MessagesData = () => (
        <Messages />);

    return (
        <BrowserRouter>
            <div className='wrapper'>
                <Header /> 

                <Sidebar /> 

                <div className='content'>
                    <Route render={ProfileData} path='/profile'/>
                    <Route render={MessagesData} path='/messages' />
                    <Route component={News} path='/news' />
                    <Route component={Music} path='/music' />
                    <Route component={Settings} path='/settings' />
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
