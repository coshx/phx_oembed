import Constants from "../constants";

const initialState = {
  request: {
    isFetching: false,
    lastUpdated: Date.now()
  },
  session: {
    signedIn: false,
    user: {}
  }
};

function appReducer (state = initialState, action) {
  switch (action.type) {
    case Constants.ACTIONS.NEW_SESSION_REQUEST:
      return Object.assign({}, state, {
        request: {
          isFetching: true,
          lastUpdated: Date.now()
        }
      })

    case Constants.ACTIONS.NEW_SESSION_SUCCESS:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          msg: "Successfully signed in",
          lastUpdated: Date.now()
        },
        session: {
          signedIn: true,
          user: action.user
        }
      })

    case Constants.ACTIONS.NEW_SESSION_FAILURE:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          msg: action.msg,
          lastUpdated: Date.now()
        }
      })

    case Constants.ACTIONS.SESSION_DESTROY_REQUEST:
      return Object.assign({}, state, {
        request: {
          isFetching: true,
          lastUpdated: Date.now()
        }
      })

    case Constants.ACTIONS.SESSION_DESTROY_SUCCESS:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          msg: "Successfully signed out",
          lastUpdated: Date.now()
        },
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.SESSION_DESTROY_FAILURE:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          msg: "An error occured. Please try to sign in again",
          lastUpdated: Date.now()
        },
        session: {
          signedIn: false,
          user: {}
        }
      })

    default:
      return state
  }
};

export default appReducer
