import {
    REQUEST_CUREENT_STANDINGS,
    RECEIVE_CURRENT_STANDINGS
} from './CurrentStandingsActions'

import {
    REQUEST_CAREER,
    RECEIVE_CAREER
} from './CareerActions'


export const LOGGED_IN = "LOGGED_IN";

const inialState = {
    isLoggedIn: false,
    access_token: null,
    currentStandings: null,
    lastUpdatedCurrent: null,
    career: null,
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
        case REQUEST_CAREER:
            return Object.assign({}, state, {
                isFetchingCareer: true
            })
        case RECEIVE_CAREER:
            return Object.assign({}, state, {
                isFetchingCareer: false,
                lastUpdatedCareer: action.receivedAt,
                career: action.career,
            })
        default:
            return state
    }
}