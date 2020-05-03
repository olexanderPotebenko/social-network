import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {addPost, addNewText} from './State/State.js';

export let AppRender = (state) => {
    ReactDOM.render(
        <App state={state} 
        addNewText={addNewText}
        addPost={addPost} />,
        document.getElementById('root')
    );
};

