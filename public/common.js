/**
 * 
 * @param {*} name 
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function loadDataFromApi(path, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/" + path, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        callback(response);

      }
    };
    xhttp.send();
  }



function number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}