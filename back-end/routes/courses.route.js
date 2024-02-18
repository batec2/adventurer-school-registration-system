import express from "express";
import { getCourses } from "../controller/courses.controller.js";

const router = express.Router();
router.get("/", getCourses);
router.delete("/delete/:courseid");
// router.post("/");
// router.delete("/");

export default router;
