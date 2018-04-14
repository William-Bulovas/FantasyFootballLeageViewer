export const REQUEST_STANDINGS = 'REQUEST_STANDINGS'
export const RECEIVE_STANDINGS = 'RECEIVE_STANDINGS'

function requestStandings() {
  return {
    type: REQUEST_STANDINGS,
  }
}

function receiveStandings(standings) {
  return {
    type: RECEIVE_STANDINGS,
    standings: standings,
    receivedAt: Date.now()
  }
}

function fetchStandings(state) {
  return dispatch => {
    dispatch(requestStandings())
    return fetch('api/league/standings/' + state.access_token)
      .then(response => response.json())
      .then(json => dispatch(receiveStandings(json)))
  }
}

function shouldFetchStandings(state) {
  return state.isLoggedIn && state.standings == null;
}

export function fetchStandingsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchStandings(getState())) {
      return dispatch(fetchStandings(getState()));
    }
  }
}