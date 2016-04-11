import expect                   from "expect";
import Constants                from "../../../web/static/js/constants";
import sessionReducer           from "../../../web/static/js/reducers/session_reducer";
import * as sessionActions      from "../../../web/static/js/actions/sessions";

const initialState = Constants.DEFAULT_STATE;

describe("sessionReducer", () => {

  it("should return the default state with no match", () => {
    const returnedState = sessionReducer(undefined, {})
    expect(returnedState).toEqual({})
  })

  it("should handle NEW_SESSION_REQUEST", () => {
    const returnedState = sessionReducer(undefined, sessionActions.newSessionRequest());
    expect(returnedState).toEqual({isFetching: true });
  })

  it("should handle NEW_SESSION_SUCCESS", () => {
    const user = {id: 3, email: "example@example.com"};
    const returnedState = sessionReducer(undefined, sessionActions.newSessionSuccess(user));
    expect(returnedState).toEqual({
      isFetching: false,
      session: {
        signedIn: true,
        user: user
      }
    });
  })

  it("should handle NEW_SESSION_FAILURE", () => {
    const msg = "Something went wrong"
    const returnedState = sessionReducer(undefined, sessionActions.newSessionFailure(msg));
    expect(returnedState).toEqual({
      isFetching: false,
      session: {
        signedIn: false,
        user: {}
      },
    });
  })

  it("should handle DESTROY_SESSION_REQUEST", () => {
    const returnedState = sessionReducer(undefined, sessionActions.destroySessionRequest());
    expect(returnedState).toEqual({isFetching: true});
  })

  it("should handle DESTROY_SESSION_SUCCESS", () => {
    const returnedState = sessionReducer(undefined, sessionActions.destroySessionSuccess());
    expect(returnedState).toEqual({
      isFetching: false,
      session: {
        signedIn: false,
        user: {}
      }
    });
  })

  it("should handle DESTROY_SESSION_FAILURE", () => {
    const msg = "some message";
    const returnedState = sessionReducer(undefined, sessionActions.destroySessionFailure(msg));
    expect(returnedState).toEqual({
      isFetching: false,
      session: {
        signedIn: false,
        user: {}
      }
    });
  })
})
