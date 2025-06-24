
import React from 'react';
import '../styles/Department.css';

interface DepartmentProps {
  totalStaff: number;
  setTotalStaff: (value: number) => void;
  onShowStaff: () => void; // NEW prop
}

const Department: React.FC<DepartmentProps> = ({
  totalStaff,
  setTotalStaff,
  onShowStaff,
}) => {
  return (
    <div className="department-wrapper">
      <h2 className="grid-title">Department Details</h2>

      <div className="department-form-row">
        <div className="form-item">
          <label htmlFor="department" className="department-label">Department Id</label>
          <select id="department">
            <option value="">Select</option>
            <option value="AGRI">AGRI</option>
            <option value="AI&DS">AI&DS</option>
            <option value="BME">BME</option>
            <option value="CSE">CSE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="IT">CYBER SECURITY</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="IT">IT</option>
            <option value="IT">IOT</option>
            <option value="MECH">MECH</option>
            <option value="IT">MBA</option>
            <option value="IT">MCA</option>
          </select>
        </div>
       <div className="form-item">
          <label htmlFor="department" className="department-label">Department Name </label>
          <input type='text'></input></div>
        <div className="form-item">
          <label htmlFor="block" className="department-label">Block</label>
          <input type="text" id="block" />
        </div>

        <div className="form-item">
          <label htmlFor="totalStaff" className="department-label">Total Staff</label>
          <input
            type="text"
            id="totalStaff"
            value={totalStaff}
            onChange={(e) => setTotalStaff(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="button-container">
        <button className="grid-button" onClick={onShowStaff}>Next</button>
      </div>
    </div>
  );
};

export default Department;
