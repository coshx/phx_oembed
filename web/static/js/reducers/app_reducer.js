import Constants from "../constants";

const initialState = {
  isFetching: false,
  flash: {
    flashType: "",
    message: ""
  },
  session: {
    signedIn: false,
    user: {}
  }
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.ACTIONS.NEW_SESSION_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case Constants.ACTIONS.NEW_SESSION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "success",
          message: "Successfully signed in"
        },
        session: {
          signedIn: true,
          user: action.user
        }
      })

    case Constants.ACTIONS.NEW_SESSION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "error",
          message: action.msg
        },
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case Constants.ACTIONS.DESTROY_SESSION_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "success",
          message: "Successfully signed out"
        },
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.DESTROY_SESSION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "error",
          message: action.msg
        },
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.REHYDRATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        flash: {
          flashType: "",
          message: ""
        },
        session: {
          signedIn: false,
          user: {}
        }
      })

    case Constants.ACTIONS.REHYDRATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "",
          message: ""
        },
        session: {
          signedIn: true,
          user: action.user
        }
      })

    case Constants.ACTIONS.REHYDRATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "error",
          message: "Something went wrong. Please sign in again"
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
