import "./EnrollButton.styles.css";

const EnrollButton = ({ status, handleEnroll }) => {
  if (status === "enrolled") {
    return <button>Unenroll</button>;
  } else if (status === "open") {
    return <button onClick={() => handleEnroll()}>Enroll</button>;
  }
  return <button>Full</button>;
};

export default EnrollButton;
