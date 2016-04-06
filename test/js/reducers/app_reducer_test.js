import expect             from "expect";
import appReducer         from "../../../web/static/js/reducers/app_reducer";
import * as Actions       from "../../../web/static/js/actions/sessions";

const initialState = {
  flash: {
    flashType: "",
    message: ""
  },
  isFetching: false,
  user: {}
};

describe("appReducer", () => {
  it("should return the initial state", () => {
    const returnedState = appReducer(undefined, {});
    expect(returnedState).toEqual(initialState);
  })

  it("should handle NEW_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, Actions.newSessionRequest());
    expect(returnedState).toEqual({
      flash: {
        flashType: "",
        message: ""
      },
      isFetching: true,
      user: {}
    });
  })

  it("should handle NEW_SESSION_SUCCESS", () => {
    const user = {id: 3, email: "example@example.com"};
    const returnedState = appReducer(undefined, Actions.newSessionSuccess(user));
    expect(returnedState).toEqual({
      flash: {
        flashType: "success",
        message: "Successfully signed in"
      },
      isFetching: false,
      user: user
    });
  })

  it("should handle NEW_SESSION_FAILURE", () => {
    const msg = "Something went wrong"
    const returnedState = appReducer(undefined, Actions.newSessionFailure(msg));
    expect(returnedState).toEqual({
      flash: {
        flashType: "error",
        message: msg
      },
      isFetching: false,
      user: {}
    });
  })

  it("should handle DESTROY_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, Actions.destroySessionRequest());
    expect(returnedState).toEqual({
      flash: {
        flashType: "",
        message: ""
      },
      isFetching: true,
      user: {}
    });
  })

  it("should handle DESTROY_SESSION_SUCCESS", () => {
    const returnedState = appReducer(undefined, Actions.destroySessionSuccess());
    expect(returnedState).toEqual({
      flash: {
        flashType: "success",
        message: "Successfully signed out"
      },
      isFetching: false,
      user: {}
    });
  })

  it("should handle DESTROY_SESSION_FAILURE", () => {
    const msg = "some message";
    const returnedState = appReducer(undefined, Actions.destroySessionFailure(msg));
    expect(returnedState).toEqual({
      flash: {
        flashType: "error",
        message: msg
      },
      isFetching: false,
      user: {}
    });
  })
})
