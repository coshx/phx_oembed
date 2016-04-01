import Constants from "../constants";

const initialState = {
  request: {
    isFetching: false,
    lastUpdated: Date.now()
  },
  session: {
    user: {},
    jwt: ""
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
          user: action.user,
          jwt: action.jwt
        }
      })

    case Constants.ACTIONS.NEW_SESSION_FAILURE:
      return Object.assign({}, state, {
        request: {
          isFetching: false,
          msg: action.msg,
          lastUpdated: Date.now()
        },
        session: {
          user: {},
          jwt: ""
        }
      })

    default:
      return state
  }
};

export default appReducer
