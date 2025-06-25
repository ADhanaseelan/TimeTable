import React, { useState } from 'react';
import '../styles/Table.css';

const Table: React.FC = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [department, setDepartment] = useState('');

  return (
    <div className="table-wrapper">
      <div className="form-grid">
        <div className="form-row">
          <label>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>
        <div className="form-row">
          <label>Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-row">
          <label>Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="form-row">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            // placeholder="e.g., CSE"
          />
        </div>
      </div>
      <div className="submit-row">
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default Table;