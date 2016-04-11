import Constants        from "../constants";

export function requestStart(requestType) {
  return(
    {
      type: Constants.ACTIONS.REQUEST_START,
      requestType: requestType
    }
  );
}

export function requestEnd() {
  return(
    {
      type: Constants.ACTIONS.REQUEST_END,
      requestType: ""
    }
  );

}
