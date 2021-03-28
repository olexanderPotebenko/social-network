import {SET_AUTH_DATA, WS_FOLLOW, setWsActionCreator} from '../reducers/authReducer.js';
import {WS_MESSAGE, READ_MESSAGES, getDialog, getDialogs} from '../reducers/messagesReducer.js';
import {SEND_YOU_MESSAGE, FOLLOW_YOU, LIKE_YOUR_POST, addNotification} from '../reducers/notifi.js';
import {SET_LIKES_POST} from '../reducers/profileReducer.js';

const SEND_MESSAGE = 'SEND-MESSAGE';


const ws = store => next => action => {

  let result = next(action);

  let state = store.getState();

  const startWebSocketConnection = () => {
    let ws = new WebSocket('ws://127.0.0.1:8181');
    ws.onopen = (e) => {
      store.dispatch(setWsActionCreator(ws));
      ws.send(JSON.stringify({
        token: state.auth.token,
        id: state.auth.id,
        action: 'AUTH',
      }));
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        setTimeout(startWebSocketConnection(), 2000);
      }
    };

    ws.onmessage = (event) => {
      state = store.getState();
      console.log(event);
      let data = JSON.parse(event.data);
      console.log(data);
      //let {id, token, dialog_id} = options;
      //alert(`[message] Данные получены с сервера: ${event.data}`);
      let options = {};
      switch(data.action) {
        case SEND_MESSAGE:

          console.log(state);
          options = {
            id: state.auth.id,
            token: state.auth.token,
          };

          if(state.messagesPage.dialogs.find(dialog => dialog.user_id == data.id)){
            let url = document.location.href;
            if( Object.keys(state.messagesPage.dialog).length
              && ~url.lastIndexOf(state.messagesPage.dialog.dialog_id)
              && state.messagesPage.dialog.user_id === data.id ) {

              let dialog_id = state.messagesPage.dialogs
                .find(dialog => dialog.user_id == data.id).dialog_id;
              options.dialog_id = dialog_id;
              store.dispatch(getDialog(options));

            } else {
              //let {id, token, user_id} = options;
              //data.id, SEND_YOU_MESSAGE
              options = {
                id: state.auth.id,
                token: state.auth.token,
                user_id: data.id,
              };
              store.dispatch(addNotification(options, SEND_YOU_MESSAGE));
            }
          } else {
            store.dispatch(getDialogs(options))
              .then(res => {
                state = store.getState();
                let dialog_id = state.messagesPage.dialogs
                  .find(dialog => dialog.user_id == data.id).dialog_id;
                options.dialog_id = dialog_id;
                store.dispatch(getDialog(options));
              });
          }
          break;
        case READ_MESSAGES:
          //alert('new mess');
          if(state.messagesPage.dialog.dialog_id === data.dialog_id) {
            options = {
              id: state.auth.id,
              token: state.auth.token,
              dialog_id: data.dialog_id,
            };
            store.dispatch(getDialog(options));
          };
          break;
        case WS_FOLLOW:
          options = {
            id: state.auth.id,
            token: state.auth.token,
            user_id: data.id,
          };
          store.dispatch(addNotification(options, FOLLOW_YOU));

          break;
        case SET_LIKES_POST:
          options = {
            id: state.auth.id,
            token: state.auth.token,
            user_id: data.id,
          };
          store.dispatch(addNotification(options, LIKE_YOUR_POST));

          break;

      };
    };
  }

  let data = '';
  let user_id = '';

  switch(action.type) {
    case SET_AUTH_DATA:
      console.log(SET_AUTH_DATA);
      startWebSocketConnection();
      break;
    case WS_MESSAGE:
      data = JSON.stringify({
        id: state.auth.id,
        action: 'SEND-MESSAGE',
        user_id: action.user_id,
      });
      state.auth.ws.send(data);
      break;
    case READ_MESSAGES:
      data = JSON.stringify({
        id: state.auth.id,
        action: READ_MESSAGES,
        user_id: state.messagesPage.dialog.user_id,
        dialog_id: state.messagesPage.currentDialog,
      });
      state.auth.ws.send(data);
      break;
    case WS_FOLLOW:
      data = JSON.stringify({
        id: state.auth.id,
        action: action.type,
        user_id: action.user_id,
      });
      state.auth.ws.send(data);
      break;
    case SET_LIKES_POST:
      let routs = action.post.picture.split('/').filter(rout => rout != '');
      user_id = routs[routs.indexOf('profile') + 1];
      if(user_id != state.auth.id && action.post.likes.includes(state.auth.id)) {
        data = JSON.stringify({
          id: state.auth.id,
          action: action.type,
          user_id,
          post_id: action.post.id,
        });
        state.auth.ws.send(data);
      }
      break;
  }

  return result;
}

export default ws;
