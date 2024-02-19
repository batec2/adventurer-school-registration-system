import "./Course.styles.css";

const Course = ({ courseInfo, studentId, handleCourseSelect }) => {
  const {
    _id,
    courseSymbol,
    courseNumber,
    courseName,
    students,
    capacity,
    startTime,
  } = courseInfo;

  let courseCss = "courseContainerFull";
  let buttonText = "Full";

  if (students.includes(studentId)) {
    courseCss = "courseContainerEnrolled";
    buttonText = "Enrolled";
  } else if (students.length < capacity) {
    courseCss = "courseContainer";
    buttonText = "Open";
  }

  /**
   * Converts time to hours
   * @returns time string
   */
  const getTime = () => {
    const time = startTime / 60;
    if (time <= 11) {
      return `${time} AM`;
    } else if (time === 12) {
      return `${time} PM`;
    } else {
      return `${time - 12} PM`;
    }
  };

  return (
    <div className={courseCss} onClick={(e) => handleCourseSelect(_id)}>
      <div className="courseInformation">
        <h2>{`${courseSymbol} ${courseNumber}`}</h2>
        <p>{courseName}</p>
        <p>{getTime()}</p>
      </div>
      <div className="statusInformation">
        <h3>{buttonText}</h3>
      </div>
    </div>
  );
};

export default Course;
