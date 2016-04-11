import Constants from "../constants";

function flashReducer(state = {}, action) {
  switch(action.type) {

    case Constants.ACTIONS.FLASH_SUCCESS:
      return Object.assign({}, state, {
        flashType: "success",
        message: action.message
      })

    case Constants.ACTIONS.FLASH_ERROR:
      return Object.assign({}, state, {
        flashType: "error",
        message: action.message
      })

    case Constants.ACTIONS.FLASH_CLEAR:
      return Object.assign({}, state, {
        flashType: "",
        message: ""
      })

    default:
      return state
  }
}

export default flashReducer
