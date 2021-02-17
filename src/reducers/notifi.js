import {v4} from 'uuid';

export const ADD_NOTIFICATIONS = 'ADD-NOTIFICATIONS';
export const REMOVE_NOTIFICATION = 'REMOVE-NOTIFICATION';
export const SET_OPACITY = 'SET-OPACITY';

export const SEND_YOU_MESSAGE = 'send you message';
export const SUBSCRIBED_TO_YOU = 'subscribed to you';

let initial_state = {
  notifications: [],
};

let notifi = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      let newState = {
        ...state,
        notifications: state.notifications.concat({
          id: v4(),
          opacity: 1,
          date: new Date().getTime(),
          user: action.user,
          description: action.description,
        }),
      }
      debugger;
      return newState;
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(item => item.id !== action.id),
      }
      case SET_OPACITY:
      return {
        ...state,
        notifications: state.notifications
        .map(item => item.id === action.id? {...item, opacity: action.opacity}: item),
      }
    default:
      return state;
  }
}

export const addNotificationActionCreator = (user, description) => 
  ({type: ADD_NOTIFICATIONS, user, description});
export const removeNotification = id => ({type: REMOVE_NOTIFICATION, id});

export const setOpacity = (id, opacity) => ({type: SET_OPACITY, id, opacity});

export default notifi;

