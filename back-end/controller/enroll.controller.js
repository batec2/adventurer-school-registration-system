import {
  enrollToCourseRepository,
  unenrollFromCourseRepository,
} from "../repository/enroll.repository.js";

/**
 * Enrolls into a course
 * @param {*} req
 * @param {*} res
 * @returns 200 if success 400 if failed, 500 if server error
 */
export const enrollToCourse = async (req, res) => {
  try {
    const { params, body } = req;
    console.log(params, body);
    const courseId = params.courseid;
    const studentId = body.studentid;
    const { courseResult, studentResult, result } =
      await enrollToCourseRepository(courseId, studentId);
    if (courseResult && studentResult) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(400).json({ message: "Failed to enroll", result: result });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

/**
 * Unenrolls from course
 * @param {*} req
 * @param {*} res
 * @returns 200 if success 400 if failed, 500 if server error
 */
export const unenrollFromCourse = async (req, res) => {
  try {
    const { params, body } = req;
    const courseId = params.courseid;
    const studentId = body.studentid;
    const { courseResult, studentResult, result } =
      await unenrollFromCourseRepository(courseId, studentId);
    if (courseResult && studentResult) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(400).json({ message: "Failed to unenroll", result: result });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
