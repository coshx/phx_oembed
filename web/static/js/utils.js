const Utils = {

  makeRequestOptions: function (method, data) {
    const token = localStorage.getItem("phxAuthToken");
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Authorization", token);

    const baseOptions = {
      method: method,
      headers: headers
    };

    if (data) {
      return Object.assign({}, baseOptions, { body: JSON.stringify(data) });
    } else {
      return baseOptions;
    }
  },

  debounce: function (func, wait = 500, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
};

export default Utils;
