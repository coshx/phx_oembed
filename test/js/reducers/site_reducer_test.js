import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import siteReducer               from "../../../web/static/js/reducers/site_reducer";
import * as siteActions         from "../../../web/static/js/actions/sites";

describe("siteReduer", () => {
    it("should handle GET_SITES_REQUEST", () => {
    const returnedState = siteReducer(undefined, siteActions.getSitesRequest());
    expect(returnedState).toEqual({
      isFetching: true,
      flash: {
        flashType: "",
        message: ""
      },
      session: {
        signedIn: false,
        user: {}
      }
    });
  })

  it("should handle GET_SITES_SUCCESS", () => {
    const sites = [{domain: "example.com", protocol: "https"}]
    const returnedState = siteReducer(undefined, siteActions.getSitesSuccess(sites));
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "",
        message: ""
      },
      session: {
        signedIn: false,
        user: {}
      },
      sites: sites
    });
  })

  it("should handle GET_SITES_FAILURE", () => {
    const returnedState = siteReducer(undefined, siteActions.getSitesFailure());
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "error",
        message: "Error retrieving site list"
      },
      session: {
        signedIn: false,
        user: {}
      }
    });
  })
});
