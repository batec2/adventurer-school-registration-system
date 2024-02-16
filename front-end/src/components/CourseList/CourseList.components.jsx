import Course from "../Course/Course.component";
import "./CourseList.styles.css";

const CourseList = ({ courses }) => {
  return (
    <ul className="courseListContainer">
      {courses.map((course) => (
        <Course key={course._id} courseInfo={course}></Course>
      ))}
    </ul>
  );
};

export default CourseList;
