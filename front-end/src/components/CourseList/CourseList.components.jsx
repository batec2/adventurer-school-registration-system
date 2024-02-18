import Course from "../Course/Course.component";
import "./CourseList.styles.css";

const CourseList = ({ courses, studentId, handleCourseSelect }) => {
  return (
    <div className="courseListContainer">
      {courses.map((course) => (
        <Course
          key={course._id}
          courseInfo={course}
          studentId={studentId}
          handleCourseSelect={handleCourseSelect}
        ></Course>
      ))}
    </div>
  );
};

export default CourseList;
