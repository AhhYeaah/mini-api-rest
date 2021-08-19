"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(require('cors')());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var info = [];
var id = 0;
app.get('/', function (req, res) {
    var hasParams = Object.keys(req.query).length > 0;
    if (hasParams) {
        var objectInContext = info.filter(function (obj) {
            var validParams = [];
            Object.keys(req.query).forEach(function (parameters) {
                if (parameters in obj.data) {
                    validParams.push(obj.data[parameters] == req.query[parameters]);
                }
                else {
                    validParams.push(false);
                }
            });
            var isAllParamsValid = validParams.every(function (x) { return x; });
            if (isAllParamsValid) {
                return obj;
            }
            else {
            }
        });
        res.send(objectInContext);
    }
    else {
        res.send(info);
    }
});
app.post('/', function (req, res) {
    var date = new Date(Date.now());
    var newObj = __assign({
        metaData: {
            "id": id,
            "time": date.toUTCString(),
            "lastUpdate": null
        }
    }, {
        "data": req.body
    });
    info.push(newObj);
    res.send(newObj).status(200);
    id++;
});
app.put('/', function (req, res) {
    var UpdateObj = info.find(function (obj) { return obj["metaData"].id == req.query.id; });
    if (UpdateObj !== undefined) {
        UpdateObj.data = req.body;
        UpdateObj.metaData.lastUpdate = new Date(Date.now()).toISOString();
    }
    else {
        res.status(404).send();
    }
    res.send(UpdateObj);
});
app.delete('/', function (req, res) {
    var exists = info.indexOf(info.find(function (obj) { return obj["metaData"].id == req.query.id; }));
    if (exists === -1) {
        res.status(404).send("Not found");
    }
    else {
        info.splice(exists, 1);
        res.send(info);
    }
});
app.listen(3000);
console.log("Throw some chapolle in there and where set!");
