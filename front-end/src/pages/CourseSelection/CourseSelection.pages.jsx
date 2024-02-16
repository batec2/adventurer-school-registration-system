import "./CourseSelection.styles.css";
import { useCourseGet } from "../../../query/CourseQuery";
import CourseList from "../../components/CourseList/CourseList.components";

const CourseSelection = () => {
  const { status, data, error, isFetching, isPending } = useCourseGet();
  if (isPending || isFetching) {
    return (
      <div>
        <p>IM LOADING BRO</p>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <p>I Got a error Bro</p>
      </div>
    );
  }
  return (
    <div className="courseSelectionContainer">
      <CourseList courses={data}></CourseList>
    </div>
  );
};

export default CourseSelection;
