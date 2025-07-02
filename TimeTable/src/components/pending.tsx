import React, { useEffect, useState } from 'react';
import '../styles/pending.css';

interface CrossDeptRecord {
  department: string;
  subject_name: string;
  subject_code: string;
  year: string;
  semester: string;
  section: string;
  assignedStaff: string | null;
}

const PendingCrossDept: React.FC = () => {
  const [data, setData] = useState<CrossDeptRecord[]>([]);
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('loggedUser') || '';
    setLoggedUser(user);

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://localhost:7244/api/CrossDepartmentAssignments/grouped?department=${encodeURIComponent(user)}`
        );
        const result = await res.json();
        setData(result); // ✅ Already filtered from backend
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const groupKey = (r: CrossDeptRecord) =>
    `${r.department}-${r.year}-${r.semester}-${r.section}`;

  const grouped: { [key: string]: CrossDeptRecord[] } = {};
  data.forEach((record) => {
    const key = groupKey(record);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(record);
  });

  const isGroupFullyApproved = (group: CrossDeptRecord[]) =>
    group.every((r) => r.assignedStaff && r.assignedStaff.trim() !== '');

  const handleGenerate = async (groupKey: string) => {
    const [department, year, semester, section] = groupKey.split('-');

    try {
      const res = await fetch(
        `https://localhost:7244/api/CrossDepartmentAssignments/generateTimetable?department=${encodeURIComponent(
          department
        )}&year=${year}&semester=${semester}&section=${section}`
      );

      if (!res.ok) throw new Error('Failed to trigger generation');
      const result = await res.json();
      alert(result.message); // Optional feedback
    } catch (err) {
      console.error('❌ Error generating timetable:', err);
    }
  };

  return (
    <div className="table-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
        Cross Department Subject Approvals ({loggedUser})
      </h2>
      <div className="subject-list">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Section</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped).length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#888' }}>
                  No data found.
                </td>
              </tr>
            ) : (
              Object.entries(grouped).map(([key, group]) => (
                <React.Fragment key={key}>
                  {group.map((item, idx) => (
                    <tr key={`${key}-${idx}`}>
                      <td>{item.department}</td>
                      <td>{item.subject_name}</td>
                      <td>{item.subject_code}</td>
                      <td>{item.year}</td>
                      <td>{item.semester}</td>
                      <td>{item.section}</td>
                      <td>
                        {item.assignedStaff && item.assignedStaff.trim() !== ''
                          ? 'Approved'
                          : 'Pending'}
                      </td>
                      <td>
                        {idx === 0 && isGroupFullyApproved(group) && (
                          <button
                            className="generate-btn"
                            onClick={() => handleGenerate(key)}
                          >
                            Generate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingCrossDept;
