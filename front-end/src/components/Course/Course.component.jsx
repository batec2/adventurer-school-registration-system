import "./Course.styles.css";

const Course = ({ courseInfo, studentId, handleCourseSelect }) => {
  const { _id, courseSymbol, courseNumber, courseName, students, capacity } =
    courseInfo;

  const checkEnrolled = () => {
    if (students.includes(studentId)) {
      return "Enrolled";
    } else if (students.length < capacity) {
      return "Open";
    }
    return "closed";
  };

  return (
    <div className="courseContainer" onClick={(e) => handleCourseSelect(_id)}>
      <h2>{`${courseSymbol} ${courseNumber}`}</h2>
      <p>{courseName}</p>
      <h3>{checkEnrolled()}</h3>
    </div>
  );
};

export default Course;
