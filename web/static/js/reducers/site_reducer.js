import Constants from "../constants";

function siteReducer(state = {}, action) {
  switch(action.type) {
    case Constants.ACTIONS.GET_SITES_SUCCESS:
      return Object.assign({}, state, {
        siteList: action.sites
      })

    case Constants.ACTIONS.GET_SITES_FAILURE:
      return Object.assign({}, state, {
        siteList: []
      })

    default:
      return state
  }
};

export default siteReducer
