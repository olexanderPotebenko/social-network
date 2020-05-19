const ADD_POST = 'ADD-POST';
const ADD_NEW_TEXT = 'ADD-NEW-TEXT';

let initial_state = {
    posts: [
        {id: 1, message: 'Hi everybody!', likes: 18},
        {id: 2, message: 'I created new akk', likes: 22},
        {id: 3, message: 'This is my firs project on React!!!', likes: 3},
        {id: 4, message: 'great mood :)', likes: 10}
    ],
    textNewPost: ''
};

let profileReducer = (state = initial_state, action) => {

    switch (action.type) {
        case(ADD_POST):
            return addPost(state);
        case(ADD_NEW_TEXT):
            return addNewText(state, action.text);
    };
    return state;
};

// method of components
function addPost (state) {
    let state_copy = {...state};
    state_copy.posts = [...state.posts];
    let obj = {
        id: 6,
        message: state_copy.textNewPost,
        likes: 0
    };

    state_copy.posts.unshift(obj);
    return state_copy;
};
function addNewText (state, text) {
    let state_copy = {...state};
    state_copy.textNewPost = text;
    return state_copy;
};

export default profileReducer;

