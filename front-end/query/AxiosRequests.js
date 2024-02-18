import axios from "axios";

export const fetchCourses = async () => {
  const response = await axios.get(`http://localhost:8080/courses/`);
  if (response.status !== 200) {
    throw new Error(`Failed to get courses`);
  }
  return response.data;
};

export const fetchStudents = async () => {
  const response = await axios.get("http://localhost:8080/students/");
  if (response.status !== 200) {
    throw new Error(`Failed to get students`);
  }
  return response.data;
};

export const enrollToClass = async (courseId, studentId) => {
  const response = await axios.patch(
    `http://localhost:8080/enroll/${courseId}`,
    { studentid: studentId }
  );
  if (response.status !== 200) {
    throw new Error(`Failed to enroll`);
  }
  return response.data;
};

export const fetchOneCourse = async ({ queryKey }) => {
  console.log(queryKey);
  const courseId = queryKey[0];
  const response = await axios.get(`http://localhost:8080/courses/${courseId}`);
  if (response.status !== 200) {
    throw new Error(`Failed to get course`);
  }
  return response.data;
};
