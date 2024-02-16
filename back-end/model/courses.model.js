import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseSymbol: { type: String, required: true },
  courseNumber: { type: String, required: true },
  startTime: Number,
  endTime: Number,
  description: String,
  teacher: {
    firstName: String,
    lastName: String,
  },
  capacity: Number,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    },
  ],
});

const Course = mongoose.model("courses", CourseSchema);

export { Course, CourseSchema };
