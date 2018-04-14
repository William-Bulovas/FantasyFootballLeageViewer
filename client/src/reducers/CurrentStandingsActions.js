export const REQUEST_CUREENT_STANDINGS = 'REQUEST_CUREENT_STANDINGS'
export const RECEIVE_CURRENT_STANDINGS = 'RECEIVE_CURRENT_STANDINGS'

function requestCurrentStandings() {
  return {
    type: REQUEST_CUREENT_STANDINGS,
  }
}

function receiveCurrentStandings(currentStandings) {
  return {
    type: RECEIVE_CURRENT_STANDINGS,
    standings: currentStandings,
    receivedAt: Date.now()
  }
}

function fetchCurrentStandings(state) {
  return dispatch => {
    dispatch(requestCurrentStandings())
    return fetch('api/league/standings/current/' + state.access_token)
      .then(response => response.json())
      .then(json => dispatch(receiveCurrentStandings(json)))
  }
}

function shouldFetchCurrentStandings(state) {
  return state.isLoggedIn && state.currentStandings == null;
}

export function fetchCurrentStandingsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchCurrentStandings(getState())) {
      return dispatch(fetchCurrentStandings(getState()));
    }
  }
}