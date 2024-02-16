import express from "express";
import { getStudents } from "../controller/students.controller.js";

const router = express.Router();
router.get("/", getStudents);
router.post("/");
router.patch("/");
router.delete("/");

export default router;
