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

  /**
   * Navigates to CourseInfo page on select
   * @param {*} courseId
   */
  const handleCourseSelect = (courseId) => {
    if (currentStudentId !== null && currentStudentId !== -1) {
      navigate(`info/${courseId}/${currentStudentId}`);
    } else {
      toast("Please Select Student", {
        toastId: "selectStudent",
      });
    }
  };

  /**
   * different messages depending on data state
   */
  if (courses.isPending) {
    return (
      <div className="titleContainer">
        <p>Loading</p>
        <p>Server can take upwards of 90 seconds to spin up</p>
      </div>
    );
  } else if (courses.isError) {
    return (
      <div className="titleContainer">
        <p>Recieved an error</p>
        <p>Server maybe suspended</p>
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
