import mongoose from "mongoose";

const CourseSchema = new mongoose.Scheme({
  courseSymbol: { type: String, required: true },
  courseNumber: { type: String, required: true },
  startTime: Number,
  endTime: Number,
  description: String,
  teacher: {
    firstName: String,
    lastName: String,
  },
});

const Course = mongoose.model("courses", CourseSchema);

export { Course, CourseSchema };
