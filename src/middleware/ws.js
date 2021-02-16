import {SET_AUTH_DATA, setWsActionCreator} from '../reducers/authReducer.js';
import {WS_MESSAGE, READ_MESSAGES, getDialog, getDialogs} from '../reducers/messagesReducer.js';

const SEND_MESSAGE = 'SEND-MESSAGE';


const ws = store => next => action => {
  console.log(SET_AUTH_DATA);

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
      switch(data.action) {
        case SEND_MESSAGE:

          console.log(state);
          let options = {
            id: state.auth.id,
            token: state.auth.token,
          };

          if(state.messagesPage.dialogs.find(dialog => dialog.user_id == data.id)){
            let dialog_id = state.messagesPage.dialogs
              .find(dialog => dialog.user_id == data.id).dialog_id;
            options.dialog_id = dialog_id;
            store.dispatch(getDialog(options));
          } else {
            store.dispatch(getDialogs(options))
              .then(res => {
                state = store.getState();
                debugger;
                let dialog_id = state.messagesPage.dialogs
                  .find(dialog => dialog.user_id == data.user_id).dialog_id;
                options.dialog_id = dialog_id;
                debugger;
                store.dispatch(getDialog(options));
              });
          }
          break;
        case READ_MESSAGES:
          //alert('new mess');
          if(state.messagesPage.dialog.dialog_id === data.dialog_id) {
            let options = {
              id: state.auth.id,
              token: state.auth.token,
              dialog_id: data.dialog_id,
            };
            store.dispatch(getDialog(options));
          };
          break;
      };
    };
  }

  let data = '';

  switch(action.type) {
    case SET_AUTH_DATA:
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
  }

  return result;
}

export default ws;
