import expect             from "expect";
import appReducer         from "../../../web/static/js/reducers/app_reducer";
import * as Actions       from "../../../web/static/js/actions/sessions"

const initialState = {
  request: {
    isFetching: false,
    lastUpdated: Date.now()
  },
  session: {
    signedIn: false,
    user: {}
  }
};

describe("appReducer", () => {
  it("should return the initial state", () => {
    const returnedState = appReducer(undefined, {});
    expect(returnedState.request.isFetching).toEqual(false);
    expect(returnedState.session.signedIn).toEqual(false);
    expect(returnedState.session.user).toEqual({});
  })

  it("should handle NEW_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, Actions.newSessionRequest());
    expect(returnedState.request.isFetching).toEqual(true);
    expect(returnedState.session.signedIn).toEqual(false);
    expect(returnedState.session.user).toEqual({});
  })

  it("should handle NEW_SESSION_SUCCESS", () => {
    const user = {id: 3, email: "example@example.com"};
    const returnedState = appReducer(undefined, Actions.newSessionSuccess(user));
    expect(returnedState.request.isFetching).toEqual(false);
    expect(returnedState.request.msg).toEqual("Successfully signed in");
    expect(returnedState.session.signedIn).toEqual(true);
    expect(returnedState.session.user).toEqual(user);
  })

  it("should handle NEW_SESSION_FAILURE", () => {
    const returnedState = appReducer(undefined, Actions.newSessionFailure());
    expect(returnedState.request.isFetching).toEqual(false);
    expect(returnedState.session.signedIn).toEqual(false);
    expect(returnedState.session.user).toEqual({});
  })

  it("should handle DESTROY_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, Actions.destroySessionRequest());
    expect(returnedState.request.isFetching).toEqual(true);
    expect(returnedState.session.signedIn).toEqual(false);
    expect(returnedState.session.user).toEqual({});
  })

  it("should handle DESTROY_SESSION_SUCCESS", () => {
    const returnedState = appReducer(undefined, Actions.destroySessionSuccess());
    expect(returnedState.request.isFetching).toEqual(false);
    expect(returnedState.request.msg).toEqual("Successfully signed out");
    expect(returnedState.session.signedIn).toEqual(false);
    expect(returnedState.session.user).toEqual({});
  })

  it("should handle DESTROY_SESSION_FAILURE", () => {
    const msg = "some message";
    const returnedState = appReducer(undefined, Actions.destroySessionFailure(msg));
    expect(returnedState.request.isFetching).toEqual(false);
    expect(returnedState.request.msg).toEqual(msg);
    expect(returnedState.session.signedIn).toEqual(false);
    expect(returnedState.session.user).toEqual({});
  })
})
