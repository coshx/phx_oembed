import expect               from "expect";
import Constants            from "../../../web/static/js/constants";
import flashReducer         from "../../../web/static/js/reducers/flash_reducer";
import * as flashActions    from "../../../web/static/js/actions/flash";


describe("flashReducer", () => {
  it("should return the default state with no match", () => {
    const returnedState = flashReducer(undefined, {});
    expect(returnedState).toEqual({});
  })

  it("should handle FLASH_SUCCESS", () => {
    const msg = "Flash success";
    const returnedState = flashReducer(undefined, flashActions.flashSuccess(msg));
    expect(returnedState).toEqual({
      flashType: "success",
      message: msg
    })
  })

  it("should handle FLASH_ERROR", () => {
    const msg = "Flash error";
    const returnedState = flashReducer(undefined, flashActions.flashError(msg));
    expect(returnedState).toEqual({
      flashType: "error",
      message: msg
    })
  })

  it("should handle FLASH_CLEAR", () => {
    const returnedState = flashReducer(undefined, flashActions.flashClear());
    expect(returnedState).toEqual({
      flashType: "",
      message: ""
    })
  })
})
