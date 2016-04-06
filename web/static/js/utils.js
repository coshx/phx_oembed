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
  }
};

export default Utils;
