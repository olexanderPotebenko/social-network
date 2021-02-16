import {SET_AUTH_DATA} from '../reducers/authReducer.js';
import {WS_MESSAGE, getDialogs} from '../reducers/messagesReducer.js';

const authMiddleware = store => next => action => {

  let state = store.getState();
  let result;

  switch(action.type) {
    case SET_AUTH_DATA:
      result = next(action);
      state = store.getState();
      console.log('STATE: ');
      console.log(state);
      let options = {
        id: state.auth.id,
        token: state.auth.token,
      };
      console.log('OPTIONS');
      console.log(options);
      store.dispatch(getDialogs(options));
      break;
    default:
      result = next(action);
  };

  return result;
}

export default authMiddleware;
