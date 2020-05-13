import profileReducer from '../reducers/profileReducer.js';
import messagesReducer from '../reducers/messagesReducer.js';
import sidebarReducer from '../reducers/sidebarReducer.js';

let store = {
    _state: {
        messagesPage: {
            dialogs: [],
            messages: []
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi everybody!', likes: 18},
                {id: 2, message: 'I created new akk', likes: 22},
                {id: 3, message: 'This is my firs project on React!!!', likes: 3},
                {id: 4, message: 'great mood :)', likes: 10}
            ],
            textNewPost: ''
        },
        sidebar: {
        },
        users: [
            {name: 'Olexander', id: '1'},
            {name: 'Andrey', id: '2'},
            {name: 'Sergey', id: '3'}
        ]

    },
    get state(){
        return this._state;
    },
    subscribe (observer) {
        this._AppRender = observer;
    },
    _AppRender (state) {
        console.log('state changed');
    },
    dispatch(action) {
        this.state.profilePage = profileReducer(this._state.profilePage, action);
        this.state.messagesPage = messagesReducer(this._state.profilePage, action);
        this.state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._AppRender(this);
    }
};

export default store;
