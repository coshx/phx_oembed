import Constants        from "../constants";
import Utils            from "../utils";
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
        dispatch(flashActions.flashError("Problem fetching sites"));
        dispatch(requestActions.requestEnd());
        dispatch(getSitesFailure());
      });
    };
  }
}

export default SiteActions
