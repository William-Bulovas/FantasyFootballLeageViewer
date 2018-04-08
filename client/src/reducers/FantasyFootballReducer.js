export const LOGGED_IN = "LOGGED_IN";

const inialState = {
    isLoggedIn: false,
    access_token: null,
}

export default function FantasyFootballReducer(state = inialState, action){
    switch(action.type){
        case LOGGED_IN:
        console.log("in reducer");
            return Object.assign({}, state, {
                isLoggedIn: true,
                access_token: action.token,
            })
        default:
            return state
    }
}