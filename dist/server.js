"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// """database"""
var database = [];
var id = 0;
app.get("/", function (req, res) {
    var queryParams = Object.keys(req.query);
    var hasParams = queryParams.length > 0;
    if (!hasParams) {
        res.send(database);
        return;
    }
    var objectsInContext = database.filter(function (obj) {
        var isTheSearchedObject = queryParams.every(function (param) {
            //paran exists? if exists, is it the same as the query
            return param in obj.data && obj.data[param] == req.query[param];
        });
        if (isTheSearchedObject)
            return obj;
    });
    objectsInContext.length > 0
        ? res.send(objectsInContext)
        : res.status(404).send("Not found");
});
app.post("/", function (req, res) {
    //Create an object
    var newObj = {
        data: req.body,
        metaData: {
            id: id,
            time: new Date(Date.now()).toUTCString(),
            lastUpdate: null,
        },
    };
    database.push(newObj);
    res.status(200).send(newObj);
    id++;
});
app.put("/", function (_a, res) {
    var wantedId = _a.query.id, body = _a.body;
    if (!wantedId) {
        res.status(400).send();
        return;
    }
    //Update a object by id
    var objToBeUpdated = database.find(function (_a) {
        var id = _a.metaData.id;
        return id == Number(wantedId);
    });
    if (objToBeUpdated === undefined) {
        res.status(404).send();
        return;
    }
    objToBeUpdated.data = body;
    objToBeUpdated.metaData.lastUpdate = new Date(Date.now()).toISOString();
    res.send(objToBeUpdated);
});
app.delete("/", function (req, res) {
    var searchedObjIndex = database.findIndex(function (_a) {
        var id = _a.metaData.id;
        return id == Number(req.query.id);
    });
    if (searchedObjIndex === -1) {
        res.status(404).send("Not found");
    }
    else {
        database.splice(searchedObjIndex, 1);
        res.status(200).send();
    }
});
app.listen(3000 || process.env.port);
console.log("🌮 Throw some chapolle in there and where set! 🌮");
