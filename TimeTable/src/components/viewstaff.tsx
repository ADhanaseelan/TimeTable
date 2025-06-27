import React, { useState, useEffect } from 'react';
import '../styles/Staff.css';

interface StaffRecord {
  staffId: string;
  name: string;
  subject1: string;
  subject2: string;
  subject3: string;
}

const ViewStaff: React.FC = () => {
  const [viewDept, setViewDept] = useState('');
  const [existingStaff, setExistingStaff] = useState<StaffRecord[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch staff when department is known
  const fetchStaff = async (deptId: string) => {
    try {
      const response = await fetch(`https://localhost:7244/api/StaffData/department/${deptId}`);
      const data = await response.json();
      setExistingStaff(data || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  // On page load: detect user and fetch data if needed
  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser') || '';
    const isUserAdmin = loggedUser.toLowerCase() === 'admin';
    setIsAdmin(isUserAdmin);

    if (!isUserAdmin) {
      const upperUser = loggedUser.toUpperCase();
      setViewDept(upperUser);
      fetchStaff(upperUser); // Auto-fetch data
    }
  }, []);

  // Manual fetch for admins using Enter key
  const handleViewKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchStaff(viewDept);
    }
  };

  return (
    <div className="staff-table-wrapper">
      <h2 className="grid-title1">View Staff</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Department ID to view"
          value={viewDept}
          onChange={(e) => setViewDept(e.target.value.toUpperCase())}
          onKeyDown={handleViewKeyPress}
          disabled={!isAdmin} // frozen for non-admins
          style={{ padding: '8px', width: '300px' }}
        />
      </div>

      {existingStaff.length > 0 && (
        <>
          <h3>Existing Staff</h3>
          <div className="table-wrapper1">
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
                {existingStaff.map((staff, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'row-white' : 'row-grey'}>
                    <td>{index + 1}</td>
                    <td><input type="text" value={staff.staffId} readOnly /></td>
                    <td><input type="text" value={staff.name} readOnly /></td>
                    <td><input type="text" value={staff.subject1} readOnly /></td>
                    <td><input type="text" value={staff.subject2} readOnly /></td>
                    <td><input type="text" value={staff.subject3} readOnly /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewStaff;
