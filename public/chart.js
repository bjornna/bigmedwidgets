(function () {
    let ehrId = getUrlParameter("ehr_id");
    var viewData = {
        ehr_id: ehrId, 
        procedures:[], 
        diagnosis: []
    }
    var vueView = new Vue({
        el: '#ehr',
        data: viewData
    })

  

       
    function loadDataFromServerBasedOnProcedures(procedures) {
        datasource = [];
        chart.setData(datasource);
        procedures.forEach(function (p) {
            loadDataFromApi("stat/random/10", function (data) {
                console.log("Data for " + p.code);
                console.log(data);

                for (let index = 0; index < data.length; index++) {
                    const n = data[index];
                    datasource.push({
                        type: p.code,
                        n: n,
                        year: index + ""
                    });

                }
                chart.setData(datasource);
            });

        })
    }
    var datasource = [{
        type: 'x', 
        n: 100, 
        year : "0"
    }];

    var chart = new tauCharts.Chart({
        data: datasource,
        type: 'line',
        x: 'year',
        y: 'n',
        color: 'type' // there will be two lines with different colors on the chart
    });
    chart.renderTo('#line');

    loop(1000);

    function updateStatistics(data){
        console.log(data);
        var allexist = true;
        for (let index = 0; index < viewData.procedures.length; index++) {
            const p = viewData.procedures[index];
            var code = p.code;
            var obj = data.procedures.find(function (obj) { return obj.code === code; });
            if(!obj){
                allexist = false;
            }
            
        }
        if(allexist && data.procedures.length == viewData.procedures.length){
            console.log("We have the same procedures - will not update graph");
        }else{
            viewData.procedures = data.procedures;
            loadDataFromServerBasedOnProcedures(viewData.procedures);
        }
        viewData.diagnosis = data.diagnosis;
        
    }

    function loop(ms) {
        setTimeout(function () {
            loadDataFromApi("ehrs/" + ehrId, updateStatistics);
            loop(ms);
        }, ms);
    }
})();