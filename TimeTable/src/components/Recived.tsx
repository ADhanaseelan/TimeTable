import React, { useEffect, useState } from 'react';
import '../styles/Recived.css'; // Adjust the path as necessary

interface SubjectRecord {
  subCode: string;
  subjectName: string;
  subjectType: string;
  credit: number;
  staff_assigned?: string;
  department?: string;
  year?: string;
  semester?: string;
  section?: string;
}

const Received: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch received subject assignments for this department
    const fetchReceived = async () => {
      try {
        // You may want to use the logged-in department here
        const loggedUser = localStorage.getItem('loggedUser') || '';
        const res = await fetch(
          `https://localhost:7244/api/SubjectAssignments/received?department=${encodeURIComponent(loggedUser)}`
        );
        const data = await res.json();
        setSubjects(data || []);
      } catch  {
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReceived();
  }, []);

  return (
    <div className="table-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Received Staff Assignments</h2>
      <div className="subject-list">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Type</th>
              <th>Credit</th>
              <th>From Dept</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Section</th>
              <th>Staff Assigned</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>Loading...</td>
              </tr>
            ) : subjects.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>No received assignments</td>
              </tr>
            ) : (
              subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td>{subj.subCode}</td>
                  <td>{subj.subjectName}</td>
                  <td>{subj.subjectType}</td>
                  <td>{subj.credit}</td>
                  <td>{subj.department}</td>
                  <td>{subj.year}</td>
                  <td>{subj.semester}</td>
                  <td>{subj.section}</td>
                  <td>{subj.staff_assigned}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Received;