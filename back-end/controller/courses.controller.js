import { getCoursesFromRepository } from "../repository/courses.repository.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await getCoursesFromRepository();
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting courses" });
  }
};

export const addStudentToCourse = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting courses" });
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
