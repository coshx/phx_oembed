import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import siteReducer               from "../../../web/static/js/reducers/site_reducer";
import * as siteActions         from "../../../web/static/js/actions/sites";

describe("siteReduer", () => {

  it("should return the default state with no match", () => {
    const returnedState = siteReducer(undefined, {})
    expect(returnedState).toEqual([])
  })

  it("should handle GET_SITES_SUCCESS", () => {
    const sites = [{domain: "example.com", protocol: "https"}]
    const returnedState = siteReducer(undefined, siteActions.getSitesSuccess(sites));
    expect(returnedState).toEqual({
      isFetching: false,
      sites: sites
    });
  })

  it("should handle GET_SITES_FAILURE", () => {
    const returnedState = siteReducer(undefined, siteActions.getSitesFailure());
    expect(returnedState).toEqual({isFetching: false});
  })
});
