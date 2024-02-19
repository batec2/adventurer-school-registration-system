import Course from "../model/courses.model.js";
import Student from "../model/students.model.js";
import mongoose from "mongoose";

/**
 * Verifies if course and student exists, there are no time conflics, the items
 * The items arent already in the list, if the course still has room
 * @param {*} courseId
 * @param {*} studentId
 * @param {*} session
 * @returns {
 * exists: false,
 * hasCourse: false,
 * hasStudent: false,
 * underCapacity:true,
 * noConflicts: false,
 * };
 */
const verifyEnrollToCourse = async (courseId, studentId, session) => {
  try {
    const result = {
      exists: false,
      hasCourse: false,
      hasStudent: false,
      underCapacity: true,
      noConflicts: false,
    };
    const course = await Course.findOne({ _id: courseId })
      .session(session)
      .exec();
    const student = await Student.findOne({ _id: studentId })
      .populate("courses") //fills the information for the objectids in courses
      .session(session)
      .exec();
    result.exists = course && student;
    if (course && student) {
      result.hasStudent = course.students.includes(studentId);
      result.hasCourse = student.courses.some(
        (course) => course._id.toString() === courseId
      );
      result.underCapacity = course.students.length < course.capacity;
      result.noConflicts = !student.courses.some(
        (studCourse) => studCourse.startTime === course.startTime
      );
    }
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Transaction to add a student to a courses
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
    console.log(err);
    throw err;
  }
};

/**
 * Transaction to add a course to a students
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
    console.log(err);
    throw err;
  }
};

/**
 * Transaction to remove a student from a courses
 * @param {*} courseId
 * @param {*} studentId
 * @param {*} session
 * @returns
 */
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
    console.log(err);
    throw err;
  }
};

/**
 * Transaction to remove a course from a student
 * @param {*} courseId
 * @param {*} studentId
 * @param {*} session
 * @returns
 */
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
    console.log(err);
    throw err;
  }
};

/**
 * Adds a course and student to the respective documents in the table
 * on failiure of either it will roll back
 * @param {*} id
 * @param {ref:'student'} student
 * @returns
 */
export const enrollToCourseRepository = async (courseId, studentId) => {
  const connection = mongoose.connection;
  //Transaction to roll back if adding to either document fails
  //Sidenote: mongoose documentation for this is dog water
  const result = await connection.transaction(async (session) => {
    const verify = await verifyEnrollToCourse(courseId, studentId);
    let courseResult;
    let studentResult;
    if (
      verify.exists &&
      !verify.hasCourse &&
      !verify.hasStudent &&
      verify.underCapacity &&
      verify.noConflicts
    ) {
      courseResult = await addCourseTransaction(courseId, studentId, session);
      studentResult = await addStudentTransaction(courseId, studentId, session);
    }
    return {
      courseResult: courseResult,
      studentResult: studentResult,
      result: verify,
    };
  });
  return result;
};

/**
 * Removes a course and student from the respective documents
 * rolls back on failure of either query
 * @param {*} courseId
 * @param {*} studentId
 * @returns
 */
export const unenrollFromCourseRepository = async (courseId, studentId) => {
  const connection = mongoose.connection;
  //Transaction to roll back if adding to either document fails
  const result = await connection.transaction(async (session) => {
    const verify = await verifyEnrollToCourse(courseId, studentId);
    let courseResult;
    let studentResult;
    //checks if entries exists first
    if (verify.exists && verify.hasCourse && verify.hasStudent) {
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
    return {
      courseResult: courseResult,
      studentResult: studentResult,
      result: verify,
    };
  });
  return result;
};
