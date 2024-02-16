import express from "express";
import { getStudents } from "../controller/students.controller.js";

const router = express.Router();
router.get("/", getStudents);
router.post("/");
router.patch("/add/:studentid");
router.delete("/delete/:studentid");

export default router;
