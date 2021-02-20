import {messageApi} from '../api/api';

export const ADD_NEW_TEXT_MESSAGE = 'ADD-NEW-TEXT-MESSAGE';
export const ADD_NEW_MESSAGE = 'ADD-NEW-MESSAGE';
export const SET_IS_FETCHING = 'SET-IS-FETCHING';
export const SET_DIALOGS = 'SET-DIALOGS';
export const SET_DIALOG = 'SET-DIALOG';
export const SELECT_DIALOG = 'SELECT-DIALOG';
export const WS_MESSAGE = 'WS-MESSAGE';
export const READ_MESSAGES = 'READ-MESSAGES';

let initial_state = {
  isFetching: true,
  currentDialog: '602d63c8db8c9f1314fae6ce',
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
    case READ_MESSAGES: 
      let newState = {
        ...state,
        dialog: {...state.dialog,
          messages: state.dialog.messages.map(mess => {
            return action.messages.find(item => mess.id == item.id)? {...mess, read: true}: mess;
          }),
        },
      }
      return newState;
    default: return state;
  };
};

const setIsFetching = isFetching => ({type: SET_IS_FETCHING, isFetching});

const setDialogsActionCreator = dialogs => ({type: SET_DIALOGS, dialogs});

const setDialogActionCreator = dialog => ({type: SET_DIALOG, dialog});

const readMessagesActionCreator = messages => ({type: READ_MESSAGES, messages});

export const selectDialog = dialog_id => ({type: SELECT_DIALOG, dialog_id});

export const getDialogs = options => dispatch => {
  dispatch(setIsFetching(true));
  return messageApi.getDialogs(options)
    .then(res => {
      if(res.data.result_code == 0){
        return dispatch(setDialogsActionCreator(res.data.dialogs) );
      }else{
      };
      dispatch(setIsFetching(false));
    });
}

export const getDialog = options => dispatch => {
  return messageApi.getDialog(options)
    .then(res => {
      if(res.data.result_code === 0){
        let dialog = {
          date: res.data.date,
          dateLastModified: res.data.dateLastModified,
          user_id: res.data.user_id,
          messages: res.data.messages,
          user_avatar: res.data.user_avatar,
          user_name: res.data.user_name,
          dialog_id: res.data.dialog_id,
        };
        dispatch(setDialogActionCreator(dialog));
      } else {
      }
    });
}

export const deleteDialog = options => dispatch => {
  messageApi.deleteDialog(options)
    .then(res => {
      if(res.data.result_code === 0) {
        dispatch(getDialogs(options));
        dispatch(selectDialog(''));
      } else {
      }
    });
}

export const sendMessage = options => dispatch => {
  return messageApi.sendMessage(options)
    .then(data => {
      if(data.result_code == 0){
        dispatch(selectDialog(data.id));
        dispatch({type: WS_MESSAGE, user_id: data.user_id});
      }
    });
};

export const readMessages = options => dispatch => {
  console.log(options)
  messageApi.readMessages(options)
    .then(data => {
      if(data.data.result_code === 0){
      console.log('readMessages');
      console.log(data);
        dispatch(readMessagesActionCreator(options.messages));
        //dispatch(getDialog(options));
      }
    });
}

export default messagesReducer;

