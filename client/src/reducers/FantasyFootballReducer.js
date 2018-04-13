import {
    REQUEST_CUREENT_STANDINGS,
    RECEIVE_CURRENT_STANDINGS
} from './CurrentStandingsActions'

export const LOGGED_IN = "LOGGED_IN";

const inialState = {
    isLoggedIn: false,
    access_token: null,
    currentStandings: null,
    lastUpdatedCurrent: null,
}

export default function FantasyFootballReducer(state = inialState, action){
    switch(action.type){
        case LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                access_token: action.token,
            })
        case REQUEST_CUREENT_STANDINGS:
            return Object.assign({}, state, {
                isFetchingCurrent: true
            })
        case RECEIVE_CURRENT_STANDINGS:
            return Object.assign({}, state, {
                isFetchingCurrent: false,
                lastUpdatedCurrent: action.receivedAt,
                currentStandings: action.standings,
            })
        default:
            return state
    }
}