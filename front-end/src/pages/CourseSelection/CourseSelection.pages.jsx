import "./CourseSelection.styles.css";
import CourseList from "../../components/CourseList/CourseList.components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourses } from "../../query/AxiosRequests";
import { useStudentGet } from "../../query/useStudentGet";
import StudentSelect from "../../components/StudentSelect/StudentSelect.component";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import StudentIdContext from "../../context/StudentIdContext";
import { toast } from "react-toastify";

const CourseSelection = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const courses = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
  const [students] = useStudentGet();
  const [currentStudentId, setStudentId] = useContext(StudentIdContext);

  const handleCourseSelect = (courseId) => {
    if (currentStudentId !== null && currentStudentId !== -1) {
      navigate(`info/${courseId}/${currentStudentId}`);
    } else {
      toast("Please Select Student", {
        toastId: "selectStudent",
      });
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
      <div className="titleContainer">
        <h1 className="title">ADVENTURER TRAINING CAMP</h1>
      </div>
      <StudentSelect
        students={students}
        handleSelect={setStudentId}
        selected={currentStudentId}
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
