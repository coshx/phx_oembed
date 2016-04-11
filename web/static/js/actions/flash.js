import Constants        from "../constants";

export function flashSuccess(message) {
  return(
    {
      type: Constants.ACTIONS.FLASH_SUCCESS,
      message: message
    }
  );
}

export function flashError(message) {
  return(
    {
      type: Constants.ACTIONS.FLASH_ERROR,
      message: message
    }
  );

}

export function flashClear(message) {
  return(
    {
      type: Constants.ACTIONS.FLASH_CLEAR
    }
  );
}
