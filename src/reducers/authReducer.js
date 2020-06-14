const SET_AUTH_DATA = 'SET-AUTH-DATA';

const initial_state = {
    user_id: null,
    email: null,
    login: null,
    is_auth: false,
    is_fetching: false,
};

const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: 
            return setAuthData(state, action);
        default:
            return state;
    };
};

const setAuthData = (state, action) => {
    return {
        ...state,
        ...action.data,
    };
};

export const setAuthDataActionCreator = data => ({type: SET_AUTH_DATA, data});

export default authReducer;
