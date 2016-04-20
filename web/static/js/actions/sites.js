import Constants              from "../constants";
import Utils                  from "../utils";
import * as requestActions    from "./request";
import * as flashActions      from "./flash";

export function getSitesSuccess(sites) {
  return({
    type: Constants.ACTIONS.GET_SITES_SUCCESS,
    sites: sites,
    sentAt: Date.now()
  });
}

export function getSitesFailure() {
  return({
    type: Constants.ACTIONS.GET_SITES_FAILURE,
    sentAt: Date.now()
  });
}

export function newSiteSuccess(newSite) {
  return({
    type: Constants.ACTIONS.NEW_SITE_SUCCESS,
    newSite: newSite,
    sentAt: Date.now()
  });
}

export function newSiteFailure() {
  return({
    type: Constants.ACTIONS.NEW_SITE_FAILURE,
    sentAt: Date.now()
  });
}

export function setCurrentSite(siteId) {
  return({
    type: Constants.ACTIONS.SET_CURRENT_SITE,
    siteId: siteId,
    sentAt: Date.now()
  });
}

/* Thunks */
const SiteActions = {

  getSites: function() {
    return function(dispatch) {
      dispatch(requestActions.requestStart("GET_SITES"));

      const requestOpts = Utils.makeRequestOptions("GET");

      fetch(Constants.ROUTES.SITES, requestOpts)
      .then((response) => {
        if (response.status == 200)
          return response.json()
        else
          throw "";
      })
      .then((json) => {
        dispatch(requestActions.requestEnd());
        dispatch(getSitesSuccess(json));
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(flashActions.flashError("Problem fetching sites: " + message));
        dispatch(getSitesFailure());
      });
    };
  },

  addSite: function(domain, protocol) {
    return function(dispatch) {
      dispatch(requestActions.requestStart("NEW_SITE"));

      const newSiteData = {site: {domain: domain, protocol: protocol}};
      const requestOpts = Utils.makeRequestOptions("POST", newSiteData);

      fetch(Constants.ROUTES.SITES, requestOpts)
      .then((response) => {
        if (response.status == 200)
          return response.json()
        else
          throw "Something went wrong";
      })
      .then((json) => {
        dispatch(requestActions.requestEnd());
        dispatch(newSiteSuccess(json))
      })
      .catch((message) => {
        dispatch(requestActions.requestEnd());
        dispatch(flashActions.flashError("Problem adding new site: " + message));
        dispatch(newSiteFailure());
      })
    }
  }
}

export default SiteActions
