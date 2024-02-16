import "./Course.styles.css";
const Course = ({ courseInfo }) => {
  const {
    _id,
    courseSymbol,
    courseNumber,
    courseName,
    description,
    teacher,
    capacity,
  } = courseInfo;
  return (
    <li className="courseContainer">
      <div className="courseItemsContainer">
        <div>
          <h1>{`${courseSymbol} ${courseNumber}`}</h1>
          <h2>{courseName}</h2>
        </div>
        {/* <button>Enroll</button> */}
      </div>
    </li>
  );
};

export default Course;
