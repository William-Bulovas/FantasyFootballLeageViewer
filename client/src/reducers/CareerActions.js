export const REQUEST_CAREER = 'REQUEST_CAREER'
export const RECEIVE_CAREER = 'RECEIVE_CAREER'

function requestCareer() {
  return {
    type: REQUEST_CUREENT_STANDINGS,
  }
}

function receiveCareer(career) {
  return {
    type: RECEIVE_CURRENT_STANDINGS,
    career: Career,
    receivedAt: Date.now()
  }
}

function fetchCareer(state) {
  return dispatch => {
    dispatch(requestCurrentStandings())
    return fetch('api/league/career/' + state.access_token)
      .then(response => response.json())
      .then(json => dispatch(receiveCurrentStandings(json)))
  }
}

function shouldFetchCareer(state) {
  return state.isLoggedIn && state.career == null;
}

export function fetchCareerIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchCareer(getState())) {
      return dispatch(fetchCareer(getState()));
    }
  }
}