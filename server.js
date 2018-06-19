// our dependencies
const express = require('express');
const app = express();
const router = express.Router();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// from top level path e.g. localhost:3000, this response will be sent
var loki = require('lokijs'),
    db = new loki('test.json');
var ehrs = db.addCollection('ehrs');
ehrs.insert({
    "ehr_id": "bna03",
    "diagnosis": [{
            "code": "S408",
            "name": "Andre spesifiserte overflateskader på skulder og overarm"
        },
        {
            "code": "D608",
            "name": "Andre spes. ervervede isolerte aplasier av erytropoetiske c."
        }
    ],
    "procedures": [{
            "code": "WEOA15",
            "name": "Ekstern stråleterapi med spesialapparat"
        },
        {
            "code": "ABFX10",
            "name": "Bulbocavernøs reflekstest"
        }
    ]
});
ehrs.insert({
    "ehr_id": "bna",
    "subject_id": 123,
    "procedures": [{
        "code": "P123",
        "name": "Laparaoskopi"
    }, {
        "code": "P456",
        "name": "Åpen operasjon"
    }],
    "diagnosis": [{
        "code": "S40",
        "name": "Test"
    }]

});

app.use('/api', router);
router.get('/', (request, response) => {
    response.json({
        message: "This is the BigMedWidget Server"
    });
});

const url = require('url');

router.get("/ehrs/:ehr_id", (request, response)=>{
    var ehrId = request.params.ehr_id;
    var hasEhr = ehrs.findOne({
        ehr_id: ehrId
    });
    if(!hasEhr){
        hasEhr = {
            "ehr_id": ehrId
        }
        ehrs.insert(hasEhr);
    }
    response.send(hasEhr); 
});

router.post("/ehrs/:ehr_id", (request, response) => {
    var ehrId = request.params.ehr_id;
    var data = request.body;
    console.log("Update on ehr_id" + ehrId);
    var hasEhr = ehrs.findOne({
        ehr_id: ehrId
    });
    if (!hasEhr) {
        hasEhr = {
            "ehr_id": ehrId
        }
        ehrs.insert(hasEhr);
    }
    if (hasEhr) {

        if (data.procedures) {
            hasEhr.procedures = data.procedures;
        }
        if (data.diagnosis) {

            hasEhr.diagnosis = data.diagnosis;
        }
        response.send(hasEhr);

    } else {
        console.log("There is no ehr here");
        response.redirect("/ehrs");
    }
});



router.route("/ehrs")
    .get(function (request, response) {
        response.send(ehrs.data);
    })
    .post(function (request, response) {

        let e = request.body;
        var hasEhr = ehrs.findOne({
            ehr_id: e.ehr_id
        });
        if (hasEhr) {
            console.log("EHR exist - remove and add");
            ehrs.remove(hasEhr);
        }
        ehrs.insert(e);

        response.json({
            id: e.ehr_id
        });
    });

//https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// set the server to listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000'));


function number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}