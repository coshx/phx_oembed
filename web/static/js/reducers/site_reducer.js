import Constants from "../constants";

function siteReducer(state = [], action) {
  switch(action.type) {
    case Constants.ACTIONS.GET_SITES_REQUEST:
      return Object.assign({}, state, {isFetching: true})

    case Constants.ACTIONS.GET_SITES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        sites: action.sites
      })

    case Constants.ACTIONS.GET_SITES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        flash: {
          flashType: "error",
          message: "Error retrieving site list"
        }
      })

    default:
      return state
  }
};

export default siteReducer
