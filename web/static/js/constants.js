const Constants = {
  DEFAULT_STATE: {
    isFetching: false,
    flash: {
      flashType: "",
      message: ""
    },
    session: {
      signedIn: false,
      user: {}
    }
  },
  ACTIONS: {
    NEW_SESSION_REQUEST:      "NEW_SESSION_REQUEST",
    NEW_SESSION_SUCCESS:      "NEW_SESSION_SUCCESS",
    NEW_SESSION_FAILURE:      "NEW_SESSION_FAILURE",
    DESTROY_SESSION_REQUEST:  "DESTROY_SESSION_REQUEST",
    DESTROY_SESSION_SUCCESS:  "DESTROY_SESSION_SUCCESS",
    DESTROY_SESSION_FAILURE:  "DESTROY_SESSION_FAILURE",
    GET_SITES_REQUEST:        "GET_SITES_REQUEST",
    GET_SITES_SUCCESS:        "GET_SITES_SUCCESS",
    GET_SITES_FAILURE:        "GET_SITES_FAILURE"
  },
  ROUTES: {
    SESSION:      "/api/v1/sessions",
    CURRENT_USER: "/api/v1/current_user"
  },
  PAGES: {
    SIGN_IN:  "/sign_in",
    SITES:    "/sites"
  }
};

export default Constants;
