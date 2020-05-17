import React from 'react';
import store from './Store/redux-store.js';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//window.store = store;

let AppRender = (state) => {
    ReactDOM.render(
        <App
            store={store}
        />,
        document.getElementById('root')
    );
};

AppRender(store.getState());

store.subscribe(() => {
    let state = store.getState();
    AppRender(state)
});
