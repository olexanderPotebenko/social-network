import React from 'react';
import store from './Store/redux-store.js';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from './StoreContext/StoreContext.jsx';

//window.store = store;

let AppRender = (state) => {
    ReactDOM.render(
        <Provider store={store}>
        <App />
        </Provider>,
        document.getElementById('root')
    );
};

AppRender(store.getState());

store.subscribe(() => {
    let state = store.getState();
    AppRender(state)
});
