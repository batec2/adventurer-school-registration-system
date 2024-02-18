import Course from "../model/courses.model.js";
import Student from "../model/students.model.js";
import mongoose from "mongoose";

/**
 *
 * @param {*} courseId
 * @param {*} studentId
 * @param {*} session
 * @returns
 */
const verifyEnrollToCourse = async (courseId, studentId, session) => {
  try {
    const result = {
      exists: false,
      hasCourse: false,
      hasStudent: false,
      atCapacity: false,
    };
    const course = await Course.findOne({ _id: courseId })
      .session(session)
      .exec();
    const student = await Student.findOne({ _id: studentId })
      .session(session)
      .exec();
    result.exists = course && student;
    result.hasStudent = course.students.includes(studentId);
    result.hasCourse = student.courses.includes(courseId);
    result.underCapacity = course.students.length < course.capacity;
    return result;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {*} courseId
 * @param {*} studentId
 * @param {*} session
 */
const addStudentTransaction = async (courseId, studentId, session) => {
  try {
    const courseResult = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        //set to prevent dups
        $addToSet: { students: studentId },
      }
    )
      .session(session)
      .exec();
    return courseResult;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {*} courseId
 * @param {*} studentId
 * @param {*} session
 */
const addCourseTransaction = async (courseId, studentId, session) => {
  try {
    const studentResult = await Student.findOneAndUpdate(
      { _id: studentId },
      {
        //set to prevent dups
        $addToSet: { courses: courseId },
      }
    )
      .session(session)
      .exec();
    return studentResult;
  } catch (err) {
    throw err;
  }
};

const removeStudentTransaction = async (courseId, studentId, session) => {
  try {
    const courseResult = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        //set to prevent dups
        $pull: { students: studentId },
      }
    )
      .session(session)
      .exec();
    return courseResult;
  } catch (err) {
    throw err;
  }
};

const removeCourseTransaction = async (courseId, studentId, session) => {
  try {
    const studentResult = await Student.findOneAndUpdate(
      { _id: studentId },
      {
        //set to prevent dups
        $pull: { courses: courseId },
      }
    )
      .session(session)
      .exec();
    return studentResult;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param {*} id
 * @param {ref:'student'} student
 * @returns
 */
export const enrollToCourseRepository = async (courseId, studentId) => {
  const connection = mongoose.connection;
  //Transaction to roll back if adding to either document fails
  //Sidenote: mongoose documentation for this is dog water
  const result = await connection.transaction(async (session) => {
    const { exists, hasCourse, hasStudent, underCapacity } =
      await verifyEnrollToCourse(courseId, studentId);
    let courseResult;
    let studentResult;
    if (exists && !hasCourse && !hasStudent && underCapacity) {
      courseResult = await addCourseTransaction(courseId, studentId, session);
      studentResult = await addStudentTransaction(courseId, studentId, session);
    }
    return { courseResult: courseResult, studentResult: studentResult };
  });
  console.log(result);
  return result;
};

export const unenrollFromCourseRepository = async (courseId, studentId) => {
  const connection = mongoose.connection;
  //Transaction to roll back if adding to either document fails
  //Sidenote: mongoose documentation for this is dog water
  const result = await connection.transaction(async (session) => {
    const { exists, hasCourse, hasStudent } = await verifyEnrollToCourse(
      courseId,
      studentId
    );
    let courseResult;
    let studentResult;
    if (exists && hasCourse && hasStudent) {
      courseResult = await removeCourseTransaction(
        courseId,
        studentId,
        session
      );
      studentResult = await removeStudentTransaction(
        courseId,
        studentId,
        session
      );
    }
    return { courseResult: courseResult, studentResult: studentResult };
  });
  return result;
};
