import "./StudentSelect.styles.css";

const StudentSelect = ({ students, handleSelect }) => {
  return (
    <select
      className="StudentDropDown"
      onChange={(e) => handleSelect(e.target.value)}
      defaultValue={-1}
    >
      <optgroup>
        <option value={-1}>select student</option>
        {students.map((student) => (
          <option
            key={student._id}
            value={student._id}
          >{`${student.firstName} ${student.lastName}`}</option>
        ))}
      </optgroup>
    </select>
  );
};

export default StudentSelect;
