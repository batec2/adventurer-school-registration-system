import {
  enrollToCourseRepository,
  unenrollFromCourseRepository,
} from "../repository/enroll.repository.js";

export const enrollToCourse = async (req, res) => {
  try {
    const { params, body } = req;
    const courseId = params.courseid;
    const studentId = body.studentid;
    const { courseResult, studentResult } = await enrollToCourseRepository(
      courseId,
      studentId
    );
    if (courseResult && studentResult) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(400).json({ message: "Failed to enroll" });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const unenrollFromCourse = async (req, res) => {
  try {
    const { params, body } = req;
    const courseId = params.courseid;
    const studentId = body.studentid;
    const { courseResult, studentResult } = await unenrollFromCourseRepository(
      courseId,
      studentId
    );
    if (courseResult && studentResult) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(400).json({ message: "Failed to unenroll" });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
