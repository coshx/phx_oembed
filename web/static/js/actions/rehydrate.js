import Constants        from "../constants";
import Utils            from "../utils";

export function rehydrateRequest() {
  return {
    type: Constants.ACTIONS.REHYDRATE_REQUEST,
    sentAt: Date.now()
  }
}

export function rehydrateSuccess(user) {
  return {
    type: Constants.ACTIONS.REHYDRATE_SUCCESS,
    recievedAt: Date.now(),
    user: user
  }
}

export function rehydrateFailure() {
  return {
    type: Constants.ACTIONS.REHYDRATE_FAILURE,
    sentAt: Date.now(),
  }
}

/* Thunks */

const rehydrateActions = {

  rehydrateStore: function() {
    return function(dispatch) {
      dispatch(rehydrateRequest);

      const requestOpts = Utils.makeRequestOptions("GET");

      fetch(Constants.ROUTES.CURRENT_USER, requestOpts)
      .then(function(response){
        if (response.status == 200)
          return response.json()
        else
          throw "";
      })
      .then(function(userAsJson) {
        dispatch(rehydrateSuccess(userAsJson));
      })
      .catch(function(){
        dispatch(rehydrateFailure())
      })
    };
  }
}

export default rehydrateActions;
