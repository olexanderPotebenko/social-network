import React from 'react';
import store from './Store/Store.js';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.store = store;

let AppRender = (store) => {
    ReactDOM.render(
        <App store={store} 
        />,
        document.getElementById('root')
    );
};

store.subscribe(AppRender);
AppRender(store);

