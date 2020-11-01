import {messageApi} from '../api/api';

export const ADD_NEW_TEXT_MESSAGE = 'ADD-NEW-TEXT-MESSAGE';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
export const SET_IS_FETCHING = 'SET-IS-FETCHING';
export const SET_DIALOGS = 'SET-DIALOGS';

let initial_state = {
    isFetching: true,
    currentDialog: '',
    newMessage: 0,
    dialogs: [],
};

let messagesReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_IS_FETCHING: 
            return {
                ...state, 
                isFetching: action.isFetching,
            };
        case SET_DIALOGS: 
            return {
                ...state,
                dialogs: action.dialogs,
            };
        default: return state;
    };
};

const setIsFetching = isFetching => ({type: SET_IS_FETCHING, isFetching});

const setDialogsActionCreator = dialogs => ({type: SET_DIALOGS, dialogs});

export const getDialogs = options => dispatch => {
    dispatch(setIsFetching(true));
    messageApi.getDialogs(options)
        .then(data => {
            if(data.result_code == 0){
                dispatch(setDialogsActionCreator(data.dialogs) );
            }else{
            };
            dispatch(setIsFetching(false));
        });
}

export default messagesReducer;

