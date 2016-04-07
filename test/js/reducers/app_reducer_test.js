import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import appReducer               from "../../../web/static/js/reducers/app_reducer";
import * as sessionActions      from "../../../web/static/js/actions/sessions";
import * as siteActions         from "../../../web/static/js/actions/sites";

const initialState = Constants.DEFAULT_STATE;

describe("appReducer", () => {
  it("should return the initial state", () => {
    const returnedState = appReducer(undefined, {});
    expect(returnedState).toEqual(initialState);
  })

  it("should handle NEW_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, sessionActions.newSessionRequest());
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

  it("should handle NEW_SESSION_SUCCESS", () => {
    const user = {id: 3, email: "example@example.com"};
    const returnedState = appReducer(undefined, sessionActions.newSessionSuccess(user));
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "success",
        message: "Successfully signed in"
      },
      session: {
        signedIn: true,
        user: user
      }
    });
  })

  it("should handle NEW_SESSION_FAILURE", () => {
    const msg = "Something went wrong"
    const returnedState = appReducer(undefined, sessionActions.newSessionFailure(msg));
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "error",
        message: msg
      },
      session: {
        signedIn: false,
        user: {}
      },
    });
  })

  it("should handle DESTROY_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, sessionActions.destroySessionRequest());
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

  it("should handle DESTROY_SESSION_SUCCESS", () => {
    const returnedState = appReducer(undefined, sessionActions.destroySessionSuccess());
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "success",
        message: "Successfully signed out"
      },
      session: {
        signedIn: false,
        user: {}
      }
    });
  })

  it("should handle DESTROY_SESSION_FAILURE", () => {
    const msg = "some message";
    const returnedState = appReducer(undefined, sessionActions.destroySessionFailure(msg));
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "error",
        message: msg
      },
      session: {
        signedIn: false,
        user: {}
      }
    });
  })

  it("should handle GET_SITES_REQUEST", () => {
    const returnedState = appReducer(undefined, siteActions.getSitesRequest());
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
    const returnedState = appReducer(undefined, siteActions.getSitesSuccess(sites));
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
    const returnedState = appReducer(undefined, siteActions.getSitesFailure());
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
})
