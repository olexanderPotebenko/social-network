const SET_EDIT_MODE = 'SET-EDIT-MODE';
const TOGGLE_EDIT_MODE = 'TOGGLE-EDIT-MODE';
const SET_LEFT = 'SET-LEFT';

let initial_state = {
  editMode: false,
  left: -260,
};

let sidebarReducer = (state = initial_state, action) => {
    switch (action.type) {
      case SET_EDIT_MODE:
        return {
          ...state,
          editMode: action.editMode,
        };
      case TOGGLE_EDIT_MODE:
        return {
          ...state,
          editMode: !state.editMode,
        }
      case SET_LEFT: 
        return {
          ...state,
          left: action.left,
        }
        default: return state;
    };
};

export const setEditMode = editMode => ({type: SET_EDIT_MODE, editMode});
export const toggleEditMode = editMode => ({type: TOGGLE_EDIT_MODE, editMode});
export const setLeft = left => ({type: SET_LEFT, left});


export default sidebarReducer;

