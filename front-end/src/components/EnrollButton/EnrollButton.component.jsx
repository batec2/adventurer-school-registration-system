import "./EnrollButton.styles.css";
import { toast } from "react-toastify";

const EnrollButton = ({ status, handleEnroll, handleUnenroll }) => {
  if (status === "enrolled") {
    return (
      <button className="EnrollButton" onClick={() => handleUnenroll()}>
        Unenroll
      </button>
    );
  } else if (status === "open") {
    return (
      <button className="EnrollButton" onClick={() => handleEnroll()}>
        Enroll
      </button>
    );
  }
  return (
    <button
      className="EnrollButton"
      onClick={() => {
        toast("Class Is Full", {
          toastId: "ClassFull",
        });
      }}
    >
      Full
    </button>
  );
};

export default EnrollButton;
