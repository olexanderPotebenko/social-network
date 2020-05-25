const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const GET_USERS = 'GET-USERS';

const initial_state = {
    users: [
        {
            user_id: 2,
            name: { first_name: 'Olexander', last_name: 'Miroshnichenko'},
            birth_date: 862444800,
            status: 'I learn React',
            location: { sity: 'Kcharkiv', country: 'Ukraine' },
            followed: true,
            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
        },
        {
            user_id: 3,
            name: { first_name: 'Kateryna', last_name: 'Miroshnichenko'},
            birth_date: 862433000,
            status: 'I learn',
            location: { sity: 'Sumy', country: 'Ukraine' },
            followed: false,
            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
        },
        {
            user_id: 4,
            name: { first_name: 'Viktoriya', last_name: 'Maruyenko'},
            birth_date: 862444333,
            status: 'I learn React',
            location: { sity: 'Lviv', country: 'Ukraine' },
            followed: true,
            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
        },
        {
            user_id: 5,
            name: { first_name: 'Sergiy', last_name: 'Ostapenko'},
            birth_date: 862444800,
            status: 'I learn React',
            location: { sity: 'Mykolaiyiv', country: 'Ukraine' },
            followed: false,
            avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' 
        },
    ]
};

let usersReducer = (state = initial_state, action) => {
    switch (action.type) {
        case FOLLOW:
            return followed(state, action.user_id);
        case UNFOLLOW:
            return unfollowed(state, action.user_id);
        default:
            return state;
    };
};

let followed = (state, id) => {
    let state_copy = {...state};
    state_copy.users = state.users.map(item => {
        if(item.user_id == id) 
            return {...item, followed: true};
        else 
            return item;
    });
    return state_copy;
};

let unfollowed = (state, id) => {
    let state_copy = {...state};
    state_copy.users = state.users.map(item => {
        if(item.user_id == id) 
            return {...item, followed: false};
        else 
            return item;
    });
    return state_copy;
};

export let followedActionCreator = user_id => {
    return {type: FOLLOW, user_id: user_id};
};
export let unfollowedActionCreator = user_id => {
    return {type: UNFOLLOW, user_id: user_id};
};

export default usersReducer;
