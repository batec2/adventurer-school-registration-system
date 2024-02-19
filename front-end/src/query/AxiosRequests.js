import axios from "axios";

/**
 * Fetches the courses from the api
 * @returns list of courses
 */
export const fetchCourses = async () => {
  const response = await axios.get(
    `https://adventurer-school-service.onrender.com/courses/`
    // `http://localhost:8080/courses/`
  );
  if (response.status !== 200) {
    throw new Error(`Failed to get courses`);
  }
  return response.data;
};

/**
 * Fetches the students from the api
 * @returns list of students
 */
export const fetchStudents = async () => {
  const response = await axios.get(
    "https://adventurer-school-service.onrender.com/students/"
    // "http://localhost:8080/students/"
  );
  if (response.status !== 200) {
    throw new Error(`Failed to get students`);
  }
  return response.data;
};

/**
 * Sends a request to enroll into courses
 * @param {*} courseId, studentID
 * @returns Error if failed, data from axios if passed
 */
export const enrollToClass = async ({ courseId, studentId }) => {
  const response = await axios.patch(
    `https://adventurer-school-service.onrender.com/enroll/${courseId}`,
    // `http://localhost:8080/enroll/${courseId}`,
    { studentid: studentId }
  );
  if (response.status !== 200) {
    throw new Error(`Failed to enroll`);
  }
  return response.data;
};

/**
 * Sends a request ot unenroll from a course
 * @param {*} courseId, studentID
 * @returns Error if failed, data from axios if passed
 */
export const unenrollToClass = async ({ courseId, studentId }) => {
  const response = await axios.patch(
    `https://adventurer-school-service.onrender.com/enroll/remove/${courseId}`,
    // `http://localhost:8080/enroll/remove/${courseId}`,
    { studentid: studentId }
  );
  if (response.status !== 200) {
    throw new Error(`Failed to enroll`);
  }
  return response.data;
};

/**
 * Fetchs a single course from the api
 * @param {*} param0
 * @returns course object, error if failed
 */
export const fetchOneCourse = async ({ queryKey }) => {
  console.log(queryKey);
  const courseId = queryKey[0];
  const response = await axios.get(
    `https://adventurer-school-service.onrender.com/courses/${courseId}`
    // `http://localhost:8080/courses/${courseId}`
  );
  if (response.status !== 200) {
    throw new Error(`Failed to get course`);
  }
  return response.data;
};
