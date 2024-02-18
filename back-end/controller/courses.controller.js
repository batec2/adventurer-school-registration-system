import {
  getCoursesFromRepository,
  getOneCourseFromRepository,
} from "../repository/courses.repository.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await getCoursesFromRepository();
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting courses" });
  }
};

export const getOneCourse = async (req, res) => {
  try {
    console.log(req.params.id);
    const course = await getOneCourseFromRepository(req.params.id);
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting course" });
  }
};

export const removeStudentFromCourse = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting courses" });
  }
};

export const addCourse = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting courses" });
  }
};
