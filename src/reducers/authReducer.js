const SET_AUTH_DATA = 'SET-AUTH-DATA';

const initial_state = {
    id: null,
    email: null,
    name: null,
    token: null,
    photo: null,
    is_auth: false,
    is_fetching: false,
};

const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_AUTH_DATA: 
            return setAuthData(state, action.data);
        default:
            return state;
    };
};

const setAuthData = (state, data) => {
    debugger;
    return {
        ...state,
        is_auth: true,
        ...data,
        is_fetching: false,
    };
};

export const setAuthDataActionCreator = data => ({type: SET_AUTH_DATA, data});

export default authReducer;
