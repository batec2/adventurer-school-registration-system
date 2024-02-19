import express from "express";
import {
  enrollToCourse,
  unenrollFromCourse,
} from "../controller/enroll.controller.js";

const router = express.Router();
router.patch("/:courseid", enrollToCourse);
router.patch("/remove/:courseid", unenrollFromCourse);

export default router;
