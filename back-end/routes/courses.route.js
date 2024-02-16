import express from "express";
import { getCourses } from "../controller/courses.controller.js";

const router = express.Router();
router.get("/", getCourses);
router.patch("/add/:studentid");
router.delete("/delete/:studentid");
// router.post("/");
// router.delete("/");

export default router;
