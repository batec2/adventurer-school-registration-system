import Course from "../model/courses.model.js";
/**
 * Finds all the monsters from the database
 * @param {*} query
 * @returns Returns a list of monsters
 */
export const getCoursesFromRepository = async () => {
  try {
    const monsters = await Course.find();
    return monsters;
  } catch (err) {
    throw Error("Error fetching Monsters");
  }
};
