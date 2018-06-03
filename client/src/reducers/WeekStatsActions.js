export const REQUEST_WEEK_STATS = "REQUEST_WEEK_STATS";
export const RECEIVE_WEEK_STATS = "RECEIVE_WEEK_STATS";

function requestWeekStats(teamId, week) {
  return {
    type: REQUEST_WEEK_STATS,
    teamId: teamId,
    week: week
  };
}

function receiveWeekStats(weekRoster, teamId, week) {
  return {
    type: RECEIVE_WEEK_STATS,
    weekRoster: weekRoster,
    receivedAt: Date.now(),
    teamId: teamId,
    week: week
  };
}

function fetchWeekStats(state, teamId, week) {
  return dispatch => {
    dispatch(requestWeekStats(teamId, week));
    return fetch(
      "api/league/teams/roster/" +
        teamId +
        "-" +
        week +
        "/" +
        state.access_token
    )
      .then(response => response.json())
      .then(json => dispatch(receiveWeekStats(json, teamId, week)));
  };
}

function shouldFetchWeekStats(state, teamId, week) {
  if (!state.isLoggedIn) {
    return false;
  }
  if (state.weekRoster == null || !state.weekRoster.hasOwnProperty(teamId)) {
    return true;
  }
  if (!state.weekRoster[teamId].hasOwnProperty(week)) {
    return true;
  }

  return false;
}

export function fetchWeekStatsIfNeeded(teamId, week) {
  return (dispatch, getState) => {
    if (shouldFetchWeekStats(getState(), teamId, week)) {
      return dispatch(fetchWeekStats(getState(), teamId, week));
    }
  };
}
