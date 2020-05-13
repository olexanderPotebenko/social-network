const ADD_POST = 'ADD-POST';
const ADD_NEW_TEXT = 'ADD-NEW-TEXT';

let profileReducer = (state, action) => {
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

