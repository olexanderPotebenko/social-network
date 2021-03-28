const LOAD_PASSWORD = 'LOAD-PASSWORD';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_PASSWORD:
      let email = action.accounts.find(acc => acc.email === action.email);
      if(email) {
        return {data: email} 
      }else {
        let newState = {data: {...state.date, email: action.email}};
        debugger;
        return newState;
      }
    default:
      return state;
  }
};

export const loadPassword = (accounts, email) => ({ type: LOAD_PASSWORD, accounts, email});

export default reducer;
