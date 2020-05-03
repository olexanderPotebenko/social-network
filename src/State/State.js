let AppRender = (state) => {
    console.log('state changed');
};

export let state = {
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

};

export default state;

export let addPost = (message) => {
    let obj = {
        id: 6,
        message: message,
        likes: 0
    };

    state.profilePage.posts.unshift(obj);
    AppRender(state);
};

export let addNewText = (text) => {
    state.profilePage.textNewPost = text;
    AppRender(state);
};

export const subscribe = (observer) => {
    AppRender = observer;
};
