import "./EnrollButton.styles.css";

const EnrollButton = ({ status, handleEnroll, handleUnenroll }) => {
  if (status === "enrolled") {
    return <button onClick={() => handleUnenroll()}>Unenroll</button>;
  } else if (status === "open") {
    return <button onClick={() => handleEnroll()}>Enroll</button>;
  }
  return <button onClick={() => alert("this class is full!!!")}>Full</button>;
};

export default EnrollButton;
