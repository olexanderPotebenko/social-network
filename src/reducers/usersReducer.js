const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT';
const SET_PAGE_CURRENT = 'SET-PAGE-CURRENT';

const initial_state = {
    options: {
        page_size: 5,
        page_current: 1,
        total_users_count: 0
    },
        users: [
    //        {
    //            user_id: 2,
    //            name: { first_name: 'Olexander', last_name: 'Miroshnichenko'},
    //            birth_date: 862444800,
    //            status: 'I learn React',
    //            location: { sity: 'Kcharkiv', country: 'Ukraine' },
    //            followed: true,
    //            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
    //        },
    //        {
    //            user_id: 3,
    //            name: { first_name: 'Kateryna', last_name: 'Miroshnichenko'},
    //            birth_date: 862433000,
    //            status: 'I learn',
    //            location: { sity: 'Sumy', country: 'Ukraine' },
    //            followed: false,
    //            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
    //        },
    //        {
    //            user_id: 4,
    //            name: { first_name: 'Viktoriya', last_name: 'Maruyenko'},
    //            birth_date: 862444333,
    //            status: 'I learn React',
    //            location: { sity: 'Lviv', country: 'Ukraine' },
    //            followed: true,
    //            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
    //        },
    //        {
    //            user_id: 5,
    //            name: { first_name: 'Sergiy', last_name: 'Ostapenko'},
    //            birth_date: 862444800,
    //            status: 'I learn React',
    //            location: { sity: 'Mykolaiyiv', country: 'Ukraine' },
    //            followed: false,
    //            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
    //        },
        ]
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

export let followedActionCreator = user_id => {
    return {type: FOLLOW, user_id: user_id};
};
export let unfollowedActionCreator = user_id => {
    return {type: UNFOLLOW, user_id: user_id};
};

export let setUsersActionCreator = users => {
    return {type: SET_USERS, users};
};

export let setUsersCountActionCreator = total_users_count => {
    return {type: SET_USERS_TOTAL_COUNT, total_users_count};
};

export let setPageCurrentActionCreator = page_current => {
    return {type: SET_PAGE_CURRENT, page_current};
};

export default usersReducer;
