import "./CourseInfo.styles.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneCourse } from "../../query/AxiosRequests";
import EnrollButton from "../../components/EnrollButton/EnrollButton.component";
import useEnroll from "../../query/useEnroll";
import useUnenroll from "../../query/useUnenroll";
import { toast } from "react-toastify";

const CourseInfo = () => {
  const { courseId, studentId } = useParams();
  const { mutateAsync: enroll } = useEnroll();
  const { mutateAsync: unenroll } = useUnenroll();
  const { data, isError, isPending, error } = useQuery({
    queryKey: [courseId],
    queryFn: fetchOneCourse,
  });

  /**
   * If data is still being fetched or errored
   */
  if (isPending) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  } else if (isError) {
    console.log(error);
    return (
      <div>
        <p>Recieved an error</p>
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
    Department,
  } = data;

  /**
   * Function to enroll on button click
   * sends alert if error, and alert to confirm
   */
  const handleEnroll = async () => {
    try {
      await enroll({ courseId: courseId, studentId: studentId });
      toast(`Enrolled in ${courseName} ${courseNumber}`, {
        toastId: `Enrolled${courseId}`,
      });
    } catch (err) {
      if (err.response.status === 400) {
        const { noConflicts } = err.response.data.result;
        console.log(noConflicts);
        if (!noConflicts) {
          toast("There is a Time Conflict", {
            toastId: "TimeConflict",
          });
        }
      }
    }
  };

  /**
   * Function to unenroll on button click
   * sends alert if error, and alert to confirm
   */
  const handleUnenroll = async () => {
    try {
      await unenroll({ courseId: courseId, studentId: studentId });
      toast(`Unenrolled from ${courseName} ${courseNumber}`, {
        toastId: `Unenrolled${courseId}`,
      });
    } catch (err) {
      toast(`EXPLOSIVE ERROR SOMETHING WENT HORRIBLY WRONG`, {
        toastId: `Unenrolled${courseId}`,
      });
      console.log(err);
    }
  };
  /**
   * Sets the button text
   */
  const findStatus = () => {
    if (students.includes(studentId)) {
      return "enrolled";
    }
    if (students.length < capacity) {
      return "open";
    }
    return "closed";
  };

  /**
   * Turns time from minutes from midnight to hours
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
    <div className="infoPageContainer">
      <div className="infoContainer">
        <h1>{`${courseSymbol} ${courseNumber}`}</h1>
        <h2>{`${courseName}`}</h2>
        <h3>Description:</h3>
        <h4>{`${description}`}</h4>
        <h3>Department:</h3>
        <h4>{`${Department}`}</h4>
        <h3>Start Time:</h3>
        <h4>{getTime()}</h4>
        <h3>Teacher:</h3>
        <h4>{`${teacher.firstName} ${teacher.lastName}`}</h4>
        <h3>Capacity:</h3>
        <h4>{`${capacity}`}</h4>
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
