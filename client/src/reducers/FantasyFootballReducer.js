import {
    REQUEST_CUREENT_STANDINGS,
    RECEIVE_CURRENT_STANDINGS
} from './CurrentStandingsActions'

import {
    REQUEST_CAREER,
    RECEIVE_CAREER
} from './CareerActions'

import {
    REQUEST_STANDINGS,
    RECEIVE_STANDINGS
} from './StandingsActions'

import {
    REQUEST_WEEK_STATS,
    RECEIVE_WEEK_STATS
} from './WeekStatsActions'

export const LOGGED_IN = "LOGGED_IN";

const inialState = {
    isLoggedIn: false,
    access_token: null,
    currentStandings: null,
    lastUpdatedCurrent: null,
    career: null,
    standings: null,
    weekRoster: {},
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
        case REQUEST_STANDINGS:
            return Object.assign({}, state, {
                isFetchingStandings: true
            })
        case RECEIVE_STANDINGS:
            return Object.assign({}, state, {
                isFetchingStandings: false,
                lastUpdatedStandings: action.receivedAt,
                standings: action.standings,
            })
        case REQUEST_WEEK_STATS:
            return Object.assign({}, state, {
                isFetchingWeekStats: true
            })
        case RECEIVE_WEEK_STATS:
            const roster = state.weekRoster;

            if (!state.hasOwnProperty(action.teamId)) {
                roster[action.teamId] = {};
            }
            
            roster[action.teamId][action.week] = action.weekRoster;
            return Object.assign({}, state, {
                isFetchingWeekStats: false,
                lastUpdatedWeekStats: action.receivedAt,
                weekRoster: roster,
            })

        default:
            return state
    }
}