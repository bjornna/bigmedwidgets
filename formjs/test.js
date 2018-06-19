var PROBLEM = "forløpsveiledning/problem_diagnose/problem_diagnosenavn";

api.addListener(PROBLEM, "OnChanged",function (id, value, parent){
    console.log("OnChanged");
    var fArr =  api.getFields(id);
    for (let index = 0; index < fArr.length; index++) {
        const element = fArr[index];
        //console.log(api.toString(element));
        
        
    }

} );