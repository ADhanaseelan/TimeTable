// src/components/Staff.tsx
import React, { useState } from 'react';
import '../styles/Staff.css';

interface StaffProps {
  totalStaff: number;
  departmentData: {
    department: string;
    block: string;
  };
}

const Staff: React.FC<StaffProps> = ({ totalStaff, departmentData }) => {
  const [staffDetails, setStaffDetails] = useState(
    Array.from({ length: totalStaff }, () => ({
      staffId: '',
      name: '',
      subject1: '',
      subject2: '',
      subject3: '',
    }))
  );

  const handleInputChange = (index: number, field: string, value: string) => {
    const updated = [...staffDetails];
    (updated[index] as any)[field] = value;
    setStaffDetails(updated);
  };

  const handleSubmit = async () => {
    const finalData = staffDetails.map((staff) => ({
      department: departmentData.department,
      block: departmentData.block,
      staffId: staff.staffId,
      name: staff.name,
      subject1: staff.subject1,
      subject2: staff.subject2,
      subject3: staff.subject3,
    }));

    try {console.log(finalData);
      const response = await fetch('https://localhost:7244/api/StaffData/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Error saving data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while sending data.');
    }
  };

  return (
    <div className="staff-table-wrapper">
      <h2 className="grid-title1">Staff Details</h2>

      {totalStaff > 0 ? (
        <>
          <div className="staff-table-header">
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
                  {staffDetails.map((staff, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'row-white' : 'row-grey'}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={staff.staffId}
                          onChange={(e) => handleInputChange(index, 'staffId', e.target.value)}
                          placeholder="Enter ID"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={staff.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                          placeholder="Enter Name"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={staff.subject1}
                          onChange={(e) => handleInputChange(index, 'subject1', e.target.value)}
                          placeholder="Subject 1"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={staff.subject2}
                          onChange={(e) => handleInputChange(index, 'subject2', e.target.value)}
                          placeholder="Subject 2"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={staff.subject3}
                          onChange={(e) => handleInputChange(index, 'subject3', e.target.value)}
                          placeholder="Subject 3"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="save-button-container">
              <button className="g-button" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </>
      ) : (
        <p>No staff to display. Please enter a value in Department page.</p>
      )}
    </div>
  );
};

export default Staff;
