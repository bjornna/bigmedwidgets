(function () {
  var ehrId = getUrlParameter("ehr_id");
  var repeatEvery = 1000;
  var chartLabels = [];
  var chartData1 = [];
  var chartData2 = [];
  var chartData3 = [];
  var viewData = {
    ehr_id: ehrId,
    procedures: [],
    diagnosis: []
    
  }
  
  var example1 = new Vue({
    el: '#ehr',
    data: viewData
  })

  var data1 = {
    labels: chartLabels,
    series: chartData1
  };
  var data2 = {
    labels: chartLabels,
    series: chartData2
  };
  var data2 = {
    labels: chartLabels,
    series: chartData3
  };
  var options = {
    labelInterpolationFnc: function (value) {
      return value[0]
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function (value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 80,
      chartPadding: 20
    }]
  ];

  new Chartist.Pie('#test1-chart', data1, options, responsiveOptions);
  new Chartist.Pie('#test2-chart', data2, options, responsiveOptions);
  new Chartist.Pie('#test3-chart', data2, options, responsiveOptions);

  // then we start the looping

loop(repeatEvery);

  function loop(ms) {
    setTimeout(function () {
      loadDataFromApi("ehrs/" + ehrId, updateView);
      loop(ms);
    }, ms);
  }

  function updateView(data) {
    console.log("Data from server");
    console.log(data);
viewData.procedures = [];
if(data.procedures){
  viewData.procedures = data.procedures;
}
if(data.diagnosis){
  viewData.diagnosis = data.diagnosis;
}
    chartLabels = [];
    chartData1 = [];
    chartData2 = [];
    chartData3 = [];
    if (viewData.procedures) {
      viewData.procedures.forEach(element => {
        chartLabels.push(element.code);
        chartData1.push(number(10, 100));
        chartData2.push(number(20, 100));
        chartData3.push(number(20, 100));
      });
    }
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