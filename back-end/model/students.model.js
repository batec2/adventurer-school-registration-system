import mongoose from "mongoose";
import { CourseSchema } from "./courses.model";

const StudentSchema = new mongoose.Scheme({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  courses: [CourseSchema],
});

const Student = mongoose.model("students", StudentSchema);

export default Student;
