export const REQUEST_CAREER = 'REQUEST_CAREER'
export const RECEIVE_CAREER = 'RECEIVE_CAREER'

function requestCareer() {
  return {
    type: REQUEST_CAREER,
  }
}

function receiveCareer(career) {
  return {
    type: RECEIVE_CAREER,
    career: career,
    receivedAt: Date.now()
  }
}

function fetchCareer(state) {
  return dispatch => {
    dispatch(requestCareer())
    return fetch('api/league/career/' + state.access_token)
      .then(response => response.json())
      .then(json => dispatch(receiveCareer(json)))
  }
}

function shouldFetchCareer(state) {
  return state.isLoggedIn && state.career == null;
}

export function fetchCareerIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCareer(getState())) {
      return dispatch(fetchCareer(getState()));
    }
  }
}