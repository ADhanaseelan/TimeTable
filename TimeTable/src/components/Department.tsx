// src/components/Department.tsx
import React, { useState } from 'react';
import '../styles/Department.css';

interface DepartmentProps {
  totalStaff: number;
  setTotalStaff: (value: number) => void;
  setDepartmentData: (data: { department: string; block: string }) => void;
  onShowStaff: () => void;
}

const Department: React.FC<DepartmentProps> = ({
  totalStaff,
  setTotalStaff,
  setDepartmentData,
  onShowStaff,
}) => {
  const [department, setDepartment] = useState('');
  const [block, setBlock] = useState('');

  const handleNext = () => {
    setDepartmentData({ department, block });
    onShowStaff();
  };

  return (
    <div className="department-wrapper">
      <h2 className="grid-title">Department Details</h2>

      <div className="department-form-row">
        <div className="form-item">
          <label htmlFor="department" className="department-label">Department</label>
          <select id="department" onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select</option>
            <option value="AGRI">AGRI</option>
            <option value="AI&DS">AI&DS</option>
            <option value="BME">BME</option>
            <option value="CSE">CSE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="IT">IT</option>
            <option value="MECH">MECH</option>
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="block" className="department-label">Block</label>
          <input type="text" id="block" onChange={(e) => setBlock(e.target.value)} />
        </div>

        <div className="form-item">
          <label htmlFor="totalStaff" className="department-label">Total Staff</label>
          <input
            type="number"
            id="totalStaff"
            value={totalStaff}
            onChange={(e) => setTotalStaff(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="button-container">
        <button className="grid-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Department;
