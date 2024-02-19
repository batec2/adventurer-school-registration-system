import "./CourseInfo.styles.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneCourse } from "../../query/AxiosRequests";
import EnrollButton from "../../components/EnrollButton/EnrollButton.component";
import useEnroll from "../../query/useEnroll";
import useUnenroll from "../../query/useUnenroll";
const CourseInfo = () => {
  const { courseId, studentId } = useParams();
  const { mutateAsync: enroll } = useEnroll();
  const { mutateAsync: unenroll } = useUnenroll();
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
      await enroll({ courseId: courseId, studentId: studentId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnenroll = async () => {
    try {
      await unenroll({ courseId: courseId, studentId: studentId });
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
    <div className="infoPageContainer">
      <div className="infoContainer">
        <h1>{`${courseSymbol} ${courseNumber}`}</h1>
        <h2>{`${courseName}`}</h2>
        <p>{`${description}`}</p>
        <p>{`${startTime}`}</p>
        <p>{`${teacher}`}</p>
        <p>{`${capacity}`}</p>
        <EnrollButton
          status={findStatus()}
          handleEnroll={handleEnroll}
          handleUnenroll={handleUnenroll}
        ></EnrollButton>
      </div>
    </div>
  );
};

export default CourseInfo;
