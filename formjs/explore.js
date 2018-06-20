var PROBLEM_EL = "forløpsveiledning/problem_diagnose/problem_diagnosenavn";
var PROBLEM = "forløpsveiledning/problem_diagnose";
var ROOT = "forløpsveiledning";

api.addListener(ROOT, "onChildRemoved", function(val){
    console.log("Anbefaling fjernet??");
});
api.addListener(PROBLEM, "onChildRemoved", function (val) {
    console.log("Child removed" + val);
    inspectProblem();
    

});
api.addListener(PROBLEM, "onChildAdded", function (val) {});
api.addListener(PROBLEM, "onFormInitialized", function (val) {});
api.addListener(PROBLEM_EL, "onChanged", function (val) {
    console.log("onChanged" + val);
    inspectProblem();
});

function inspectProblem(){
    var arr = api.getFields(PROBLEM_EL);
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        var code = element.DefiningCode.CodeString;
        console.log("n->" + code);
        
    }
}

console.log("We are running");