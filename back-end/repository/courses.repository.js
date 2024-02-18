import Course from "../model/courses.model.js";

export const getCoursesFromRepository = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (err) {
    throw Error("Error fetching Monsters");
  }
};

export const getOneCourseFromRepository = async (courseId) => {
  console.log(courseId);
  try {
    const courses = await Course.findOne({ _id: courseId });
    return courses;
  } catch (err) {
    // console.log(err);
    throw Error("Error fetching Monsters");
  }
};
