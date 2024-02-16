import express from "express";
import { getCourses } from "../controller/courses.controller.js";

const router = express.Router();
router.get("/", getCourses);
// router.post("/");
// router.patch("/");
// router.delete("/");

export default router;
