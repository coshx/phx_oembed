import Constants from "../constants";

function sessionReducer(state = {}, action) {
  switch (action.type) {
    case Constants.ACTIONS.NEW_SESSION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        session: {
          signedIn: true,
          user: action.user
        }
      })

    case Constants.ACTIONS.NEW_SESSION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        session: {
          signedIn: false,
          user: {}
        }
      })

    default:
      return state
  }
};

export default sessionReducer
