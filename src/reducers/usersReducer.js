import {userApi, followApi} from '../api/api.js';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const SET_PAGE_CURRENT = 'SET-PAGE-CURRENT';
const SET_IS_FETCHING = 'SET-IS-FETCHING';

const initial_state = {
    options: {
        page_size: 5,
        page_current: 1,
        total_users_count: 0,
        is_fetching: false,
    },
    users: [],
};

let usersReducer = (state = initial_state, action) => {
    switch (action.type) {
        case FOLLOW:
            return followed(state, action.user_id);
        case UNFOLLOW:
            return unfollowed(state, action.user_id);
        case SET_USERS:
            return setUsers(state, action.users);
        case SET_USERS_TOTAL_COUNT:
            return setTotalUsersCount(state, action.total_users_count);
        case SET_PAGE_CURRENT:
            return setPageCurrent(state, action.page_current);
        case SET_IS_FETCHING: 
            return setIsFetching(state, action.is_fetching);
        default:
            return state;
    };
};

let followed = (state, id) => {
    let state_copy = {...state};
    state_copy.users = state.users.map(item => {
        if(item.id == id) 
            return {...item, followed: true};
        else 
            return item;
    });
    return state_copy;
};

let unfollowed = (state, id) => {
    let state_copy = {...state};
    state_copy.users = state.users.map(item => {
        if(item.id == id) 
            return {...item, followed: false};
        else 
            return item;
    });
    return state_copy;
};

let setUsers = (state, users) => {
    let state_copy = {...state};
    state_copy.users = [...users];
    return state_copy;
};

let setTotalUsersCount = (state, total_users_count) => {
    let state_copy = {...state};
    state_copy.options = {...state.options};
    state_copy.options.total_users_count = total_users_count;
    return state_copy;
};

let setPageCurrent = (state, page_current) => {
    let state_copy = {...state};
    state_copy.options = {...state.options};
    state_copy.options.page_current = page_current;
    return state_copy;
};

let setIsFetching = (state, is_fetching) => {
    let state_copy = {...state};
    state_copy.options = {...state.options};
    state_copy.options.is_fetching = is_fetching;
    return state_copy;
}

let followedActionCreator = user_id => {
    return {type: FOLLOW, user_id: user_id};
};
let unfollowedActionCreator = user_id => {
    return {type: UNFOLLOW, user_id: user_id};
};

let setUsersActionCreator = users => {
    return {type: SET_USERS, users};
};

let setUsersCountActionCreator = total_users_count => {
    return {type: SET_USERS_TOTAL_COUNT, total_users_count};
};

let setPageCurrentActionCreator = page_current => {
    return {type: SET_PAGE_CURRENT, page_current};
};

let setIsFetchingActionCreator = is_fetching => {
    return {type: SET_IS_FETCHING, is_fetching};
};

export const getUsers = (options) => dispatch => {
    dispatch(setIsFetchingActionCreator(true));
    userApi.getUsers(options)
        .then(data => {
            dispatch(setUsersActionCreator(data.items) );
            dispatch(setUsersCountActionCreator(data.totalCount) );
            dispatch(setIsFetchingActionCreator(false) );
        });
}

export const follow = (options) => dispatch => {
    followApi.follow(options)
        .then(data => {
            if(data.result_code === 0){
                dispatch(followedActionCreator(options.user_id));
            };
        });
};

export const unfollow = (options) => dispatch => {
    followApi.unfollow(options)
        .then(data => {
            if(data.result_code === 0){
                dispatch(unfollowedActionCreator(options.user_id));
            };
        });
};


export default usersReducer;
