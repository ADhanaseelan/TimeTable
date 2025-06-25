// src/components/Table.tsx
import React, { useState } from 'react';
import '../styles/Table.css';

const Table: React.FC = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [department, setDepartment] = useState('');
  const [rows, setRows] = useState([
    { subject: '', time: '', checked: false },
    { subject: '', time: '', checked: false },
    { subject: '', time: '', checked: false },
  ]);

  const handleRowChange = (index: number, field: string, value: string | boolean) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  return (
    <div className="table-wrapper">
      <div className="tab-bar">
        <button className="tab-btn active">Lab</button>
        <button className="tab-btn">Class</button>
        <button className="tab-btn">Study</button>
      </div>

      <div className="form-grid">
        <div className="form-item">
          <label>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </div>
        <div className="form-item">
          <label>Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-item">
          <label>Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="form-item department-input">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g., CSE"
          />
        </div>
      </div>

      <div className="subject-list">
        {rows.map((row, index) => (
          <div className="subject-row" key={index}>
            <input
              type="text"
              placeholder="Subject"
              value={row.subject}
              onChange={(e) => handleRowChange(index, 'subject', e.target.value)}
            />
            <input
              type="text"
              placeholder="Time"
              value={row.time}
              onChange={(e) => handleRowChange(index, 'time', e.target.value)}
            />
            <input
              type="checkbox"
              checked={row.checked}
              onChange={(e) => handleRowChange(index, 'checked', e.target.checked)}
            />
          </div>
        ))}
      </div>

      <div className="submit-row">
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default Table;
