import expect                 from "expect";
import Constants              from "../../../web/static/js/constants";
import requestReducer         from "../../../web/static/js/reducers/request_reducer";
import * as requestActions    from "../../../web/static/js/actions/request";

describe("requestReducer", () => {
  it("should return the default state with no match", () => {
    const returnedState = requestReducer(undefined, {});
    expect(returnedState).toEqual({});
  })

  it("should handle REQUEST_START", () => {
    const requestType = "NEW_SESSION";
    const returnedState = requestReducer(undefined, requestActions.requestStart(requestType));
    expect(returnedState).toEqual({
      requestType: requestType,
      isFetching: true
    })
  })

  it("should handle REQUEST_END", () => {
    const returnedState = requestReducer(undefined, requestActions.requestEnd());
    expect(returnedState).toEqual({
      requestType: "",
      isFetching: false
    })
  })
})
