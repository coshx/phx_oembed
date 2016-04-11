const Constants = {
  DEFAULT_STATE: {
    request: {
      requestType: "",
      isFetching: false
    },
    flash: {
      flashType: "",
      message: ""
    },
    session: {
      signedIn: false,
      user: {}
    },
    sites: []
  },
  ACTIONS: {
    REQUEST_START:            "REQUEST_START",
    REQUEST_END:              "REQUEST_END",
    FLASH_SUCCESS:            "FLASH_SUCCESS",
    FLASH_ERROR:              "FLASH_ERROR",
    FLASH_CLEAR:              "FLASH_CLEAR",
    NEW_SESSION_SUCCESS:      "NEW_SESSION_SUCCESS",
    NEW_SESSION_FAILURE:      "NEW_SESSION_FAILURE",
    DESTROY_SESSION_SUCCESS:  "DESTROY_SESSION_SUCCESS",
    DESTROY_SESSION_FAILURE:  "DESTROY_SESSION_FAILURE",
    GET_SITES_SUCCESS:        "GET_SITES_SUCCESS",
    GET_SITES_FAILURE:        "GET_SITES_FAILURE"
  },
  ROUTES: {
    SESSION:      "/api/v1/sessions",
    CURRENT_USER: "/api/v1/current_user",
    SITES:        "/api/v1/sites"
  },
  PAGES: {
    SIGN_IN:  "/sign_in",
    SITES:    "/sites"
  }
};

export default Constants;
