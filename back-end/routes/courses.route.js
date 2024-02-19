import express from "express";
import { getCourses, getOneCourse } from "../controller/courses.controller.js";

const router = express.Router();
router.get("/", getCourses);
router.get("/:id", getOneCourse);

// router.delete("/delete/:courseid");
// router.post("/");
// router.delete("/");

export default router;
