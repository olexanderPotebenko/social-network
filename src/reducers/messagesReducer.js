import {messageApi} from '../api/api';

export const ADD_NEW_TEXT_MESSAGE = 'ADD-NEW-TEXT-MESSAGE';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
export const SET_IS_FETCHING = 'SET-IS-FETCHING';
export const SET_DIALOGS = 'SET-DIALOGS';
export const SET_DIALOG = 'SET-DIALOG';
export const SELECT_DIALOG = 'SELECT-DIALOG';

let initial_state = {
  isFetching: true,
  currentDialog: '6015db7666184dfbd6476141',
  newMessage: 0,
  dialogs: [],
  dialog: {},
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
    case SET_DIALOG: 
      return {
        ...state,
        dialog: action.dialog,
      };
    case SELECT_DIALOG:
      return {
        ...state,
        currentDialog: action.dialog_id,
      }
    default: return state;
  };
};

const setIsFetching = isFetching => ({type: SET_IS_FETCHING, isFetching});

const setDialogsActionCreator = dialogs => ({type: SET_DIALOGS, dialogs});

const setDialogActionCreator = dialog => ({type: SET_DIALOG, dialog});

export const selectDialog = dialog_id => ({type: SELECT_DIALOG, dialog_id});

export const getDialogs = options => dispatch => {
  dispatch(setIsFetching(true));
  messageApi.getDialogs(options)
    .then(res => {
      if(res.data.result_code == 0){
        dispatch(setDialogsActionCreator(res.data.dialogs) );
      }else{
      };
      dispatch(setIsFetching(false));
    });
}

export const getDialog = options => dispatch => {
  messageApi.getDialog(options)
    .then(res => {
      console.log(res);
      if(res.data.result_code === 0){
        let dialog = {
          date: res.data.date,
          dateLastModified: res.data.dateLastModified,
          user_id: res.data.user_id,
          messages: res.data.messages,
          user_avatar: res.data.user_avatar,
          user_name: res.data.user_name,
        };
        dispatch(setDialogActionCreator(dialog));
      } else {
      }
    });
}

export const sendMessage = options => dispatch => {
  return messageApi.sendMessage(options)
    .then(data => {
        debugger;
      if(data.result_code == 0){
        dispatch(selectDialog(data.id));
        return dispatch(getDialogs(options));
      }else{
        return 1;
      }
    });
};

export default messagesReducer;

