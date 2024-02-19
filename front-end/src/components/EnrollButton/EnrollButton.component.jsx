import "./EnrollButton.styles.css";

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
      onClick={() => alert("this class is full!!!")}
    >
      Full
    </button>
  );
};

export default EnrollButton;
