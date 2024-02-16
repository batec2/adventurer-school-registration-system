import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDatabase from "./database/ConnectDatabase.js";
import courses from "./routes/courses.route.js";
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
app.use("/courses", courses);

//Defaults it cant match route
app.use((req, res) => {
  res.status(404).json({ message: "Invalid Route" });
});

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
