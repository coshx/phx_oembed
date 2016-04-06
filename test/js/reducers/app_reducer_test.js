import expect             from "expect";
import appReducer         from "../../../web/static/js/reducers/app_reducer";
import * as Actions       from "../../../web/static/js/actions/sessions";

const initialState = {
  isFetching: false,
  flash: {
    flashType: "",
    message: ""
  },
  session: {
    signedIn: false,
    user: {}
  }
};

describe("appReducer", () => {
  it("should return the initial state", () => {
    const returnedState = appReducer(undefined, {});
    expect(returnedState).toEqual(initialState);
  })

  it("should handle NEW_SESSION_REQUEST", () => {
    const returnedState = appReducer(undefined, Actions.newSessionRequest());
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
    const returnedState = appReducer(undefined, Actions.newSessionSuccess(user));
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
    const returnedState = appReducer(undefined, Actions.newSessionFailure(msg));
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
    const returnedState = appReducer(undefined, Actions.destroySessionRequest());
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
    const returnedState = appReducer(undefined, Actions.destroySessionSuccess());
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
    const returnedState = appReducer(undefined, Actions.destroySessionFailure(msg));
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

  it("should handle REHYDRATE_REQUEST", () => {
    const returnedState = appReducer(undefined, Actions.rehydrateRequest());
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

  it("should handle REHYDRATE_SUCCESS", () => {
    const user = {id: 3, email: "example@example.com"};
    const returnedState = appReducer(undefined, Actions.rehydrateSuccess(user));
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "",
        message: ""
      },
      session: {
        signedIn: true,
        user: user
      }
    });
  })

  it("should handle REHYDRATE_FAILURE", () => {
    const returnedState = appReducer(undefined, Actions.rehydrateFailure());
    expect(returnedState).toEqual({
      isFetching: false,
      flash: {
        flashType: "error",
        message: "Something went wrong. Please sign in again"
      },
      session: {
        signedIn: false,
        user: {}
      }
    });
  })
})
