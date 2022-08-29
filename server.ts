import express from "express";
import cors from "cors";
import { databaseObjects } from "./src/interfaces";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// """database"""
const database: databaseObjects[] = [];
let id = 0;

app.get("/", (req, res) => {
  const queryParams = Object.keys(req.query);

  let hasParams = queryParams.length > 0;
  if (!hasParams) {
    res.send(database);
    return;
  }

  const objectsInContext = database.filter((obj) => {
    let isTheSearchedObject = queryParams.every((param) => {
      //paran exists? if exists, is it the same as the query
      return param in obj.data && obj.data[param] == req.query[param];
    });

    if (isTheSearchedObject) return obj;
  });
  objectsInContext.length > 0
    ? res.send(objectsInContext)
    : res.status(404).send("Not found");
});

app.post("/", (req, res) => {
  //Create an object
  let newObj: databaseObjects = {
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

app.put("/", ({ query: { id: wantedId }, body }, res) => {
  if (!wantedId) {
    res.status(400).send();
    return;
  }

  //Update a object by id
  let objToBeUpdated = database.find(
    ({ metaData: { id } }) => id == Number(wantedId)
  );
  if (objToBeUpdated === undefined) {
    res.status(404).send();
    return;
  }

  objToBeUpdated.data = body;
  objToBeUpdated.metaData.lastUpdate = new Date(Date.now()).toISOString();

  res.send(objToBeUpdated);
});

app.delete("/", (req, res) => {
  let searchedObjIndex = database.findIndex(
    ({ metaData: { id } }) => id == Number(req.query.id)
  );

  if (searchedObjIndex === -1) {
    res.status(404).send("Not found");
  } else {
    database.splice(searchedObjIndex, 1);
    res.status(200).send();
  }
});

app.listen(3000 || process.env.port);
console.log("🌮 Throw some chapolle in there and where set! 🌮");
