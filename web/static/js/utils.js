const Utils = {

  makeRequestOptions: function (method, data = {}) {
    const token = localStorage.getItem("phxAuthToken");
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Content-Length", body.length.toString());
    headers.append("Authorization", token);

    const options = {
      method: method,
      headers: headers,
      body: body
    }

    return options
  }
};

export default Utils;
