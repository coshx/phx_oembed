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
    sites: {
      siteList: []
    },
    routing: {}
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
    NEW_SITE_SUCCESS:         "NEW_SITE_SUCCESS",
    NEW_SITE_FAILURE:         "NEW_SITE_FAILURE",
    GET_SITES_SUCCESS:        "GET_SITES_SUCCESS",
    GET_SITES_FAILURE:        "GET_SITES_FAILURE",
    SET_CURRENT_SITE:         "SET_CURRENT_SITE",
    GET_CARDS_SUCCESS:        "GET_CARDS_SUCCESS",
    GET_CARDS_FAILURE:        "GET_CARDS_FAILURE",
    NEW_CARD_FAILURE:         "NEW_CARD_FAILURE",
    NEW_CARD_SUCCESS:         "NEW_CARD_SUCCESS"
  },
  ROUTES: {
    SESSION:      "/api/v1/sessions",
    CURRENT_USER: "/api/v1/current_user",
    SITES:        "/api/v1/sites",
    CARDS:        "/api/v1/cards"
  }
};

export default Constants;
