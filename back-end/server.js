import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDatabase from "./database/ConnectDatabase.js";
import courses from "./routes/courses.route.js";
import students from "./routes/students.route.js";
import enroll from "./routes/enroll.route.js";
dotenv.config();

const app = express();
const PORT = 8080;

//cors still sucks
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(morgan("dev")); //console loging
app.use(express.json()); //body parsing
app.use(express.urlencoded({ extended: true })); //query string
app.use("/enroll", enroll); //handles any route starting with /enroll
app.use("/courses", courses); //handles any route starting with /courses
app.use("/students", students); //handles any route starting with /students

//Defaults if cant match route
app.use((req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
