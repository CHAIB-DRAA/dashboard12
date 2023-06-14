import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the courses.
router.get("/", async (req, res) => {
  let collection = await db.collection("courses");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("courses");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    clientId: req.body.clientId,
    start: req.body.start,
    end: req.body.end,
    title: req.body.title,
    adressDepart: req.body.adressDepart,
    adressArrive: req.body.adressArrive,
    image: req.body.image ,

  };
  let collection = await db.collection("courses");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      clientId: req.body.clientId,
      start: req.body.start,
      end: req.body.end,
      title: req.body.title,
      adressDepart: req.body.adressDepart,
      adressArrive: req.body.adressArrive,
      image: req.body.image ,
      

    }
  };

  let collection = await db.collection("courses");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("courses");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;


//upload files
