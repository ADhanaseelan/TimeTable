// src/components/Department.tsx
import React, { useState } from 'react';
import '../styles/Department.css';

interface DepartmentProps {
  totalStaff: number;
  setTotalStaff: (value: number) => void;
  setDepartmentData?: (data: {
    department: string;
    departmentName: string;
    block: string;
  }) => void;
  onShowStaff: () => void;
}

const Department: React.FC<DepartmentProps> = ({
  totalStaff,
  setTotalStaff,
  setDepartmentData,
  onShowStaff,
}) => {
  const [department, setDepartment] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [block, setBlock] = useState('');

  const handleNext = () => {
    if (!department || !departmentName || !block) {
      alert('Please fill all fields!');
      return;
    }

    // Optional chaining to prevent undefined errors if setDepartmentData not passed
    setDepartmentData?.({
      department,
      departmentName,
      block,
    });

    onShowStaff(); // Proceed to Staff section
  };

  return (
    <div className="department-wrapper">
      <h2 className="grid-title">Department Details</h2>

      <div className="department-form-row">
       <div className="form-item">
  <label htmlFor="department" className="department-label">Department Id</label>
  <input
    type="text"
    id="department"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    // placeholder="Enter Department ID"
  />
</div>


        <div className="form-item">
          <label htmlFor="departmentName" className="department-label">Department Name</label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="block" className="department-label">Block</label>
          <input
            type="text"
            id="block"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />
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