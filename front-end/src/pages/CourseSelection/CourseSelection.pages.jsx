import "./CourseSelection.styles.css";
import CourseList from "../../components/CourseList/CourseList.components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enrollToClass, fetchCourses } from "../../../query/AxiosRequests";
import { useStudentGet } from "../../../query/useStudentGet";
import useEnroll from "../../../query/useEnroll";
import StudentSelect from "../../components/StudentSelect/StudentSelect.component";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import StudentIdContext from "../../../context/StudentIdContext";

const CourseSelection = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const courses = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
  const [students] = useStudentGet();
  const { mutateAsync: enroll } = useEnroll;
  const [currentStudentId, setStudentId] = useContext(StudentIdContext);

  const handleEnroll = async (courseId, studentId) => {
    try {
      await enroll(courseId, studentId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCourseSelect = (courseId) => {
    if (currentStudentId !== null) {
      navigate(`${courseId}`);
    } else {
      alert("Please select a student");
    }
  };

  if (courses.isPending) {
    return (
      <div>
        <p>IM LOADING BRO</p>
      </div>
    );
  } else if (courses.isError) {
    return (
      <div>
        <p>I Got a error Bro</p>
      </div>
    );
  }
  return (
    <div className="courseSelectionContainer">
      <h1>{currentStudentId ? currentStudentId : ""}</h1>
      <StudentSelect
        students={students}
        handleSelect={setStudentId}
      ></StudentSelect>
      <CourseList
        courses={courses.data}
        studentId={currentStudentId}
        handleCourseSelect={handleCourseSelect}
      ></CourseList>
    </div>
  );
};

export default CourseSelection;
