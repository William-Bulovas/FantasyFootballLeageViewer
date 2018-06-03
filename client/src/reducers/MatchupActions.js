export const REQUEST_MATCHUPS = "REQUEST_MATCHUPS";
export const RECEIVE_MATCHUPS = "RECEIVE_MATCHUPS";

function requestMatchups(teamId) {
  return {
    type: REQUEST_MATCHUPS,
    teamId: teamId
  };
}

function receiveMatchups(matchups, teamId) {
  return {
    type: RECEIVE_MATCHUPS,
    matchups: matchups,
    receivedAt: Date.now(),
    teamId: teamId
  };
}

function fetchMatchups(state, teamId) {
  return dispatch => {
    dispatch(requestMatchups(teamId));
    return fetch(
      "api/league/teams/matchups/" + teamId + "/" + state.access_token
    )
      .then(response => response.json())
      .then(json => dispatch(receiveMatchups(json, teamId)));
  };
}

function shouldFetchMatchups(state, teamId) {
  if (!state.isLoggedIn) {
    return false;
  }
  if (state.matchups == null || !state.matchups.hasOwnProperty(teamId)) {
    return true;
  }

  return false;
}

export function fetchMatchupsIfNeeded(teamId) {
  return (dispatch, getState) => {
    if (shouldFetchMatchups(getState(), teamId)) {
      return dispatch(fetchMatchups(getState(), teamId));
    }
  };
}
