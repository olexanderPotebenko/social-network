export const ADD_NEW_TEXT = 'ADD-NEW-TEXT';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';

let initial_state = {
    dialogs: [
        {
            dialog_id: 1,
            messages: [
                {
                    user_id: 1,
                    message_body: 'Hy!'
                },
                {
                    user_id: 2,
                    message_body: 'Hy!'
                },
                {
                    user_id: 1,
                    message_body: 'How are you?'
                },
            ],
            textNewMessage: ''
        },
        {
            dialog_id: 2,
            messages: [
                {
                    user_id: 1,
                    message_body: 'Hy!'
                },
                {
                    user_id: 3,
                    message_body: 'Hy!'
                },
                {
                    user_id: 1,
                    message_body: 'How are you?'
                },
            ],
            textNewMessage: ''
        },
        {
            dialog_id: 3,
            messages: [
                {
                    user_id: 1,
                    message_body: 'Hy!'
                },
                {
                    user_id: 4,
                    message_body: 'Hy!'
                },
                {
                    user_id: 1,
                    message_body: 'How are you?'
                },
            ],
            textNewMessage: ''
        }

    ],
};

let messagesReducer = (state = initial_state, action) => {
    switch (action.type) {
        case ADD_NEW_TEXT: 
            return addNewText(state, action.text, action.id);
        default: return state;
    };
};

let addNewText = (state, text, id) => {
    let state_copy = {...state};
    state_copy.dialogs = [...state.dialogs];
    state_copy.dialogs[state.dialogs.findIndex(item => item.dialog_id == id)].textNewMessage = text;

    return state_copy;
};

export default messagesReducer;

