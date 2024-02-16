import Student from "../model/students.model.js";

export const getStudentsFromRepository = async () => {
  try {
    const students = await Student.find();
    return students;
  } catch (err) {
    throw new Error(`Error in fetching student: ${err}`);
  }
};
