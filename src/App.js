import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Messages from './components/Messages/Messages.jsx';

function App() {
    return (
        <div className='wrapper'>
            <Header /> 

            <Sidebar /> 

            <div className='content'>
                <Messages />
            </div>
        </div>
    );
}

export default App;
