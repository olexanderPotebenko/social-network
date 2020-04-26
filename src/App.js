import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Profile from './components/Profile.jsx';

function App() {
    return (
        <div className='wrapper'>
            <Header /> 

            <Sidebar /> 
            
            <Profile />
        </div>
    );
}

export default App;
