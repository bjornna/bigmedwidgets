(function () {
    let ehrId = getUrlParameter("ehr_id");

    var viewData = {
        ehr_id: ehrId,
        procedures: [],
        diagnosis: []
    }
    var example1 = new Vue({
        el: '#ehr',
        data: viewData
    })

    function updateRecommendations(data) {
        console.log(data);
        viewData.procedures = data.procedures;
        viewData.diagnosis = data.diagnosis;

    }
    loop(1000);

    function loop(ms) {
        setTimeout(function () {
            loadDataFromApi("ehrs/" + ehrId, updateRecommendations);
            loop(ms);
        }, ms);
    }
})();