(function () {
    console.log("Document is ready");

    var viewData = {
        ehrs:[]
    }
    loadDataFromApi("ehrs", loadEhrs);
    var example1 = new Vue({
        el: '#example-1',
        data: viewData
      })

    function loadEhrs(data) {
        console.log("EHR ");
        console.log(data);
        viewData.ehrs = data;
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
})();