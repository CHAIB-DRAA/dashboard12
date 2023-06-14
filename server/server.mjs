import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import event from "./routes/events.mjs";
import relation_taxi from "./routes/relationTaxi.mjs";
import relation_autre from "./routes/relationAutre.mjs";
import relation_vtc from "./routes/relationVtc.mjs";
import courses from "./routes/courses.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
/* app.use('/login', (req, res) => {
  res.send({
    access_token: 'test123'
  });
}); */
app.use("/record", records);
app.use("/events", event);
app.use("/relation_taxi", relation_taxi);
app.use("/relation_vtc", relation_vtc);
app.use("/relation_autre", relation_autre);
app.use("/courses", courses);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

