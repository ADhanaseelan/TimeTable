import React, { useState } from 'react';
import '../styles/course.css';

interface CourseProps {
  subjectCount: number;
}

const Course: React.FC<CourseProps> = ({ subjectCount }) => {
  const [type, setType] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const selectType = (value: string) => {
    setType(value);
    setShowDropdown(false);
  };

  return (
    <div className="staff-table-wrapper">
      <h2 className="grid-title">Course Details</h2>

      {subjectCount > 0 ? (
        <>
          <div className="table-wrapper">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>
                    <div className="custom-dropdown-header">
                      <span className="label-text">Type</span>
                      <span
                        className="dropdown-icon"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        ▼
                      </span>
                      {showDropdown && (
                        <div className="dropdown-options">
                          <div onClick={() => selectType('Theory')}>Theory</div>
                          <div onClick={() => selectType('Lab')}>Lab</div>
                          <div onClick={() => selectType('Embedded')}>Embedded</div>
                        </div>
                      )}
                    </div>
                  </th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: subjectCount }).map((_, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'row-white' : 'row-grey'}
                  >
                    <td>{index + 1}</td>
                    <td><input type="text" placeholder="Code" /></td>
                    <td><input type="text" placeholder="Name" /></td>
                    <td><input type="text" value={type} readOnly /></td>
                    <td><input type="number" placeholder="Credit" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="save-button-container">
            <button className="g-button">Save</button>
          </div>
        </>
      ) : (
        <p>No subjects to display. Please enter subject count in Subject page.</p>
      )}
    </div>
  );
};

export default Course;
