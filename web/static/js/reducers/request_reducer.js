import Constants from "../constants";

function requestReducer(state = {}, action) {
  switch(action.type) {

    case Constants.ACTIONS.REQUEST_START:
      return Object.assign({}, state, {
        requestType: action.requestType,
        isFetching: true
      })

    case Constants.ACTIONS.REQUEST_END:
      return Object.assign({}, state, {
        requestType: "",
        isFetching: false
      })

    default:
      return state
  }
}

export default requestReducer
