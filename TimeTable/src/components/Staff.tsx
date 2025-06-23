import React from 'react';
import '../styles/Staff.css';

interface StaffProps {
  totalStaff: number;
}

const Staff: React.FC<StaffProps> = ({ totalStaff }) => {
  return (
    <div className="staff-table-wrapper">
      <h2 className="grid-title">Staff Details</h2>

      {totalStaff > 0 ? (
        <>
          {/* ✅ Start table container */}
          <div className="table-wrapper">
            <table className="staff-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Staff ID</th>
                  <th>Staff Name</th>
                  <th>Subject 1</th>
                  <th>Subject 2</th>
                  <th>Subject 3</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalStaff }).map((_, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'row-white' : 'row-grey'}
                  >
                    <td>{index + 1}</td>
                    <td><input type="text" placeholder="Enter ID" /></td>
                    <td><input type="text" placeholder="Enter Name" /></td>
                    <td><input type="text" placeholder="Subject 1" /></td>
                    <td><input type="text" placeholder="Subject 2" /></td>
                    <td><input type="text" placeholder="Subject 3" /></td>
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
        <p>No staff to display. Please enter a value in Department page.</p>
      )}
    </div>
  );
};

export default Staff;
