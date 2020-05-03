import React from 'react';
import state from './State/State.js';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {subscribe, addPost, addNewText} from './State/State.js';

window.state = state;

export let AppRender = (state) => {
    ReactDOM.render(
        <App state={state} 
        addNewText={addNewText}
        addPost={addPost} />,
        document.getElementById('root')
    );
};

subscribe(AppRender);
AppRender(state);
