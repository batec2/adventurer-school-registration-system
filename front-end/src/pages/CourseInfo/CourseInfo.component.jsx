import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneCourse } from "../../../query/AxiosRequests";
const CourseInfo = () => {
  const { id } = useParams();
  const { data, isError, isPending, error } = useQuery({
    queryKey: [id],
    queryFn: fetchOneCourse,
  });
  if (isPending) {
    return (
      <div>
        <p>IM LOADING BRO</p>
      </div>
    );
  } else if (isError) {
    console.log(error);
    return (
      <div>
        <p>I Got a error Bro</p>
      </div>
    );
  }

  const {
    courseSymbol,
    courseNumber,
    courseName,
    startTime,
    description,
    teacher,
    capacity,
    students,
  } = data;
  return (
    <div>
      <h1>{`${courseSymbol} ${courseNumber}`}</h1>
      <h2>{`${courseName}`}</h2>
      <p>{`${description}`}</p>
      <p>{`${startTime}`}</p>
      <p>{`${teacher}`}</p>
      <p>{`${capacity}`}</p>
    </div>
  );
};

export default CourseInfo;
