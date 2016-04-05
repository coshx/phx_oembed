const Utils = {

  makeRequest: function (method, url, data = {}) {
    return new Promise(function(resolve, reject) {
      const token = localStorage.getItem("phxAuthToken");
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", token);
      xhr.onload = function() {
        resolve(xhr);
      };
      xhr.onerror = function() {
        reject(xhr);
      };
      xhr.send(JSON.stringify(data));
    });
  }
};

export default Utils;
