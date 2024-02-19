import "./StudentSelect.styles.css";

const StudentSelect = ({ students, handleSelect, selected }) => {
  return (
    <select
      className="StudentDropDown"
      onChange={(e) => handleSelect(e.target.value)}
      value={selected === null ? -1 : selected}
    >
      <optgroup>
        <option value={-1} disabled="disabled">
          select student
        </option>
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
