import React, { useEffect, useState } from 'react';
import '../styles/subject.css';

interface SubjectRecord {
  sub_Code: string;
  subject_Name: string;
  subject_Type: string;
  credit: number;
  year: string;
  sem: string;
  department: string;
}

const ViewSubject: React.FC = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [subjectList, setSubjectList] = useState<SubjectRecord[]>([]);

  const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
  const semesters = ['Odd Semester', 'Even Semester'];
  const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `https://localhost:7244/api/SubjectData/view/${encodeURIComponent(year)}/${encodeURIComponent(semester)}/${encodeURIComponent(department)}`
      );

      if (!response.ok) {
        console.error('Server error:', response.statusText);
        return;
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setSubjectList(data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  };

  useEffect(() => {
    if (year && semester && department) {
      handleFetch();
    }
  }, [year, semester, department]);

  return (
    <div className="subject-wrapper">
      <h2 className="grid-title">View Subjects</h2>

      <div className="subject-grid-row">
        <div className="subject-grid-item">
          <label className="subject-label">Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="dropdown">
            <option value="">Select</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        <div className="subject-grid-item">
          <label className="subject-label">Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)} className="dropdown">
            <option value="">Select</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="subject-grid-item">
          <label className="subject-label">Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="dropdown">
            <option value="">Select</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {subjectList.length > 0 && (
        <div className="subject-list">
          <h3>Subjects Found: {subjectList.length}</h3>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Credit</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {subjectList.map((subj, idx) => (
                <tr key={idx}>
                  <td>{subj.sub_Code}</td>
                  <td>{subj.subject_Name}</td>
                  <td>{subj.subject_Type}</td>
                  <td>{subj.credit}</td>
                  <td>{subj.year}</td>
                  <td>{subj.sem}</td>
                  <td>{subj.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewSubject;
