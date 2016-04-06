import Constants from "../constants";

const initialState = {
  request: {
    isFetching: false,
    lastUpdated: Date.now()
  },
  session: {
    signedIn: false,
    user: {}
  },
  flash: {
    flashType: "",
    message: ""
  }
};

function appReducer(state = initialState, action) {
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
          lastUpdated: Date.now()
        },
        session: {
          signedIn: true,
          user: action.user
        },
        flash: {
          flashType: "success",
          message: "Successfully signed in"
        }
      })

    case Constants.ACTIONS.NEW_SESSION_FAILURE:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          msg: action.msg,
          lastUpdated: Date.now()
        },
        flash: {
          flashType: "error",
          message: action.msg
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_REQUEST:
      return Object.assign({}, state, {
        request: {
          isFetching: true,
          lastUpdated: Date.now()
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_SUCCESS:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          lastUpdated: Date.now()
        },
        session: {
          signedIn: false,
          user: {}
        },
        flash: {
          flashType: "success",
          message: "Successfully signed out"
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_FAILURE:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          lastUpdated: Date.now()
        },
        session: {
          signedIn: false,
          user: {}
        },
        flash: {
          flashType: "error",
          message: action.msg
        }
      })

    default:
      return state
  }
};

export default appReducer
