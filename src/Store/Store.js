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
        users: [
            {name: 'Olexander', id: '1'},
            {name: 'Andrey', id: '2'},
            {name: 'Sergey', id: '3'}
        ]

    },
    get state(){
        return this._state;
    },
    addPost (message) {
        let obj = {
            id: 6,
            message: message,
            likes: 0
        };

        this._state.profilePage.posts.unshift(obj);
        this._AppRender(this);
    },
    addNewText (text) {
        this._state.profilePage.textNewPost = text;
        this._AppRender(this);
    },
    subscribe (observer) {
        this._AppRender = observer;
    },
    _AppRender (state) {
        console.log('state changed');
    }

};

export default store;
