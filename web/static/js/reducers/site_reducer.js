import Constants from "../constants";

function siteReducer(state = {}, action) {
  switch(action.type) {
    case Constants.ACTIONS.GET_SITES_SUCCESS:
      return Object.assign({}, state, {
        siteList: action.sites
      })

    case Constants.ACTIONS.GET_SITES_FAILURE:
      return state

    case Constants.ACTIONS.NEW_SITE_SUCCESS:
      const updatedSiteList = state.siteList;
      updatedSiteList.unshift(action.newSite);
      return Object.assign({}, state, {
        siteList: updatedSiteList
      })

    case Constants.ACTIONS.NEW_SITE_FAILURE:
      return state

    case Constants.ACTIONS.SET_CURRENT_SITE:
      const currentSite = state.siteList.filter(function(site) {
        return parseInt(site.id) == parseInt(action.siteId)
      })[0];

      return Object.assign({}, state, {
        currentSite: currentSite
      })

    default:
      return state
  }
};

export default siteReducer
