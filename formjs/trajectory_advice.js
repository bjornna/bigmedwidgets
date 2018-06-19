var PROBLEM = "forløpsveiledning/problem_diagnose/problem_diagnosenavn";
var ACTION_1 = "forløpsveiledning/alternativ_1@Alternativ 1/anbefaling"
var ACTION_2 = "forløpsveiledning/alternativ_2@Alternativ 2/anbefaling";
var ACTION_3 = "forløpsveiledning/alternativ_3@Alternativ 3/anbefaling";
var SUBJECT_ID_FIELD = "generic-field-97825";
var widgetServerUrl = "http://localhost:3000/api/ehrs";

var a1 = null;
var a2 = null;
var a3 = null;
var diagnosis = [];

onLoad();
function onLoad(){
resetSubject(getSubjectId());
}

api.addListener(PROBLEM, "OnChanged", function (id, value, parent) {
    var d =  getDiagnose(value);
    console.log(d);
    diagnosis.push(d);
    updateDiagnosis();


})

api.addListener(ACTION_1, "OnChanged", function (id, value, parent) {
    a1 = getProcedure(value);
    updateProcedures();

});
api.addListener(ACTION_2, "OnChanged", function (id, value, parent) {
    a2 = getProcedure(value);
    updateProcedures();
});
api.addListener(ACTION_3, "OnChanged", function (id, value, parent) {
    a3 = getProcedure(value);
    updateProcedures();
});

function updateDiagnosis(){
    var s = "[";
    for (let index = 0; index < diagnosis.length; index++) {
        const element = diagnosis[index];
        s = s.concat(element);
        if (index == diagnosis.length - 1) {
            s = s.concat("]");
        } else {
            s = s.concat(",");
        }
    }
    var json = '{"ehr_id" : "' + getSubjectId() + '", "diagnosis": ' + s + ' }';
    console.log("Start update diagnosis with server");
    console.log(json);
    postDiagnosis(getSubjectId(), json);
    updateRecommendationAndPrecaution();

}
function updateProcedures() {
    var arr = [];
    if (a1) {
        arr.push(a1);
    }
    if (a2) {
        arr.push(a2);
    }
    if (a3) {
        arr.push(a3);
    }
    //console.log(arr);
    var s = "[";
    for (let index = 0; index < arr.length; index++) {
        s = s.concat(arr[index]);
        if (index == arr.length - 1) {
            s = s.concat("]");
        } else {
            s = s.concat(",");
        }

    }
    var json = '{"ehr_id" : "' + getSubjectId() + '", "procedures": ' + s + ' }';
    console.log(json);
    updateServerWithProcedures(getSubjectId(), json);
    updateRecommendationAndPrecaution();
}

function updateRecommendationAndPrecaution(){
    console.log("update recommendation and precaution");
    let REC_ID ="forløpsveiledning/anbefalt_tiltak@Anbefalt tiltak/anbefaling";
    let PREC_ID = "forløpsveiledning/forholdsregel/tilstand";
    
    var myText = new DvText("Jeg anbefaler at du gjør dette");
    //myText.value = "Jeg anbefaler at du gjør dette";

    var myPrecaution = new DvText();
    myPrecaution.value = "Vær oppmerksom på";

    api.setFieldValue(REC_ID, myText);
    api.setFieldValue(PREC_ID, myPrecaution);
}


function getProcedure(value) {
    var name = value.value;
    var code = value.DefiningCode.CodeString;


    var procedure = createCodeElement(code, name);
    console.log(procedure);
    return procedure;
}

function getSubjectId() {
    var subjectId = api.getFieldValue(SUBJECT_ID_FIELD);
    console.log("SubjectId:" + subjectId.value);
    return subjectId.value;
}

function updateWidgetServer(subjectId) {
    var json = '{"ehr_id":"' + subjectId + '"}';
    console.log(json);
    http.post(widgetServerUrl, json, function (result) {
        if (result.isSuccessStatusCode) {
            console.log("Wow");
        } else {

        }

    });
}

function getDiagnose(value){
    var name = value.value;
    var code = value.DefiningCode.CodeString;
    return createCodeElement(code, name);
}


function createCodeElement(code, name) {
    return '{"code":"' + code + '", "name": "' + name + '"}';
}


function updateServerWithProcedures(subjectId, json) {
    http.post(widgetServerUrl + "/" + subjectId, json, function (result) {
        if (result.isSuccessStatusCode) {
            console.log("Wow - I am done");
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }

    });
}
function postDiagnosis(subjectId, json) {
    http.post(widgetServerUrl + "/" + subjectId, json, function (result) {
        if (result.isSuccessStatusCode) {
            console.log("Wow - I am done");
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }

    });
}

function resetSubject(subjectId){
    http.post(widgetServerUrl, '{"ehr_id":"' + subjectId + '"}', function(result){
        if (result.isSuccessStatusCode) {
            console.log("Subject is reset");
        } else {
            console.log("StatusCode: " + result.statusCode);
            console.log(result.data);
        }
    });

}