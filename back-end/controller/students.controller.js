import { getStudentsFromRepository } from "../repository/students.repository.js";

export const getStudents = async (req, res) => {
  try {
    const result = await getStudentsFromRepository();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting students" });
  }
};
