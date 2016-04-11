import Constants        from "../constants";
import Utils            from "../utils";

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
      const requestOpts = Utils.makeRequestOptions("GET");

      fetch(Constants.ROUTES.SITES, requestOpts)
      .then((response) => {
        if (response.status == 200)
          return response.json()
        else
          throw "";
      })
      .then((json) => {
        dispatch(getSitesSuccess(json));
      })
      .catch((message) => {
        dispatch(getSitesFailure());
      });
    };
  }
}

export default SiteActions
