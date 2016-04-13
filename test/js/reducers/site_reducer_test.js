import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import siteReducer               from "../../../web/static/js/reducers/site_reducer";
import * as siteActions         from "../../../web/static/js/actions/sites";

describe("siteReduer", () => {

  it("should return the default state with no match", () => {
    const returnedState = siteReducer(undefined, {})
    expect(returnedState).toEqual({})
  })

  it("should handle GET_SITES_SUCCESS", () => {
    const sites = [{domain: "example.com", protocol: "https"}];
    const returnedState = siteReducer(undefined, siteActions.getSitesSuccess(sites));
    expect(returnedState).toEqual({
      siteList: sites
    });
  })

  it("should handle GET_SITES_FAILURE", () => {
    const returnedState = siteReducer({siteList: []}, siteActions.getSitesFailure());
    expect(returnedState).toEqual({siteList: []});
  })

  it("should handle NEW_SITE_SUCCESS", () => {
    const sites = [{domain: "example.com", protocol: "https"}];
    const newSite = {domain: "example.com", protocol: "https"};
    const returnedState = siteReducer({siteList: []}, siteActions.newSiteSuccess(newSite));
    expect(returnedState).toEqual({
      siteList: sites
    });
  })

  it("should handle NEW_SITE_FAILURE", () => {
    const returnedState = siteReducer({siteList: []}, siteActions.newSiteFailure());
    expect(returnedState).toEqual({siteList: []});
  })

  it("should handle SET_CURRENT_SITE", () => {
    const site = {id: 2, domain: "example.com", protocol: "https"}
    const sites = [site];
    const returnedState = siteReducer({siteList: sites}, siteActions.setCurrentSite(site.id));
    expect(returnedState).toEqual({siteList: sites, currentSite: site })
  })
});
