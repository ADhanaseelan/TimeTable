import React from 'react';
import '../styles/Department.css';

interface DepartmentProps {
  totalStaff: number;
  setTotalStaff: (value: number) => void;
  setActivePage: (page: string) => void;
}

const Department: React.FC<DepartmentProps> = ({ totalStaff, setTotalStaff, setActivePage }) => {
  return (
    <div className="department-wrapper">
      <h2 className="grid-title">Department Details</h2>

      <div className="department-grid">
        <div className="form-group">
          <label htmlFor="department" className="department-label">Department</label>
          <select id="department">
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
      </div>

      <div className="department-grid">
        <div className="form-group-row">
          <div className="form-item">
            <label htmlFor="block" className="department-label">Block</label>
            <input type="number" id="block" />
          </div>

          <div className="form-item">
            <label htmlFor="totalStaff" className="department-label">Total Staff</label>
            <input type="number"
             id="totalStaff"
             value={totalStaff}
             onChange={(e) => setTotalStaff(Number(e.target.value))}
 />
          </div>
        </div>
      </div>

      <button className="grid-button" onClick={() => setActivePage('Staff')}>Next</button>

    </div>
  );
};

export default Department;
