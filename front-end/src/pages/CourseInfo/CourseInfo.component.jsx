import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneCourse } from "../../../query/AxiosRequests";
import EnrollButton from "../../components/EnrollButton/EnrollButton.component";
import useEnroll from "../../../query/useEnroll";
const CourseInfo = () => {
  const { courseId, studentId } = useParams();
  const { mutateAsync } = useEnroll();
  const { data, isError, isPending, error } = useQuery({
    queryKey: [courseId],
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

  const handleEnroll = async () => {
    try {
      await mutateAsync({ courseId: courseId, studentId: studentId });
    } catch (err) {
      console.log(err);
    }
  };

  const findStatus = () => {
    if (students.includes(studentId)) {
      return "enrolled";
    }
    if (students.length < capacity) {
      return "open";
    }
    return "closed";
  };

  return (
    <div>
      <h1>{`${courseSymbol} ${courseNumber}`}</h1>
      <h2>{`${courseName}`}</h2>
      <p>{`${description}`}</p>
      <p>{`${startTime}`}</p>
      <p>{`${teacher}`}</p>
      <p>{`${capacity}`}</p>
      <EnrollButton
        status={findStatus()}
        handleEnroll={handleEnroll}
      ></EnrollButton>
    </div>
  );
};

export default CourseInfo;
