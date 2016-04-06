import Constants from "../constants";

const initialState = {
  flash: {
    flashType: "",
    message: ""
  },
  isFetching: false,
  user: {}
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.ACTIONS.NEW_SESSION_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case Constants.ACTIONS.NEW_SESSION_SUCCESS:
      return Object.assign({}, state, {
        flash: {
          flashType: "success",
          message: "Successfully signed in"
        },
        isFetching: false,
        user: action.user
      })

    case Constants.ACTIONS.NEW_SESSION_FAILURE:
      return Object.assign({}, state, {
        flash: {
          flashType: "error",
          message: action.msg
        },
        isFetching: false,
        user: {}
      })

    case Constants.ACTIONS.DESTROY_SESSION_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case Constants.ACTIONS.DESTROY_SESSION_SUCCESS:
      return Object.assign({}, state, {
        flash: {
          flashType: "success",
          message: "Successfully signed out"
        },
        isFetching: false,
        user: {}
      })

    case Constants.ACTIONS.DESTROY_SESSION_FAILURE:
      return Object.assign({}, state, {
        flash: {
          flashType: "error",
          message: action.msg
        },
        isFetching: false,
        user: {}
      })

    default:
      return state
  }
};

export default appReducer
