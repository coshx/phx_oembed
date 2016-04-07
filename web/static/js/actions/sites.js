import Constants        from "../constants";

export function getSitesRequest() {
  return({
    type: Constants.ACTIONS.GET_SITES_REQUEST,
    sentAt: Date.now()
  });
}

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


}
