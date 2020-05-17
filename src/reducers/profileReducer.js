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
            addPost.apply(state);
            break;
        case(ADD_NEW_TEXT):
            addNewText.apply(state, [action.text]);
            break;

    };
    return state;
};

    // method of components
function addPost () {
        let obj = {
            id: 6,
            message: this.textNewPost,
            likes: 0
        };

        this.posts.unshift(obj);
    };
function addNewText (text) {
        this.textNewPost = text;
    };

export default profileReducer;

