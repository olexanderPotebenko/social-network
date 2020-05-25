export const ADD_NEW_TEXT_MESSAGE = 'ADD-NEW-TEXT-MESSAGE';
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
        case ADD_NEW_TEXT_MESSAGE: 
            return addNewText(state, action.text, action.id);
        case ADD_NEW_MESSAGE:
            return addNewMessage(state, action.id);
        default: return state;
    };
};

let addNewText = (state, text, id) => {
    let state_copy = {...state};
    state_copy.dialogs = [...state.dialogs];
    state_copy.dialogs[state.dialogs.findIndex(item => item.dialog_id == id)].textNewMessage = text;

    return state_copy;
};

let addNewMessage = (state, id) => {
    let state_copy = {...state};
    state_copy.dialogs = [...state.dialogs];
    state_copy.dialogs[0].messages = [...state.dialogs[0].messages];
    state_copy.dialogs[0].messages.push({user_id: id, message_body: state_copy.dialogs[0].textNewMessage});
    state_copy.dialogs[0].textNewMessage = '';

    return state_copy;
};

export default messagesReducer;

