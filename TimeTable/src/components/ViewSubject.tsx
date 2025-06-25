import React, { useEffect, useState } from 'react';
import '../styles/Staff.css';

interface ViewSubjectProps {
  departmentData: {
    department: string;
    departmentName: string;
    block: string;
  };
}

const ViewSubject: React.FC<ViewSubjectProps> = ({ departmentData }) => {
  const [subjectDetails, setSubjectDetails] = useState<any[]>([]);

  useEffect(() => {
    // Fetch subject data for the department
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`https://localhost:7244/api/SubjectData/${departmentData.department}`);
        const data = await response.json();
        setSubjectDetails(data || []);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, [departmentData]);

  return (
    <div className="staff-table-wrapper">
      <h2 className="grid-title1">Subjects</h2>
      <div className="staff-table-header">
        <div className="table-wrapper1">
          <table className="staff-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Type</th>
                <th>Credit</th> {/* Added Credit column */}
              </tr>
            </thead>
            <tbody>
              {subjectDetails.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'row-white' : 'row-grey'}>
                  <td>{index + 1}</td>
                  <td>{subject.subjectCode}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.type}</td>
                  <td>{subject.credit}</td> {/* Show credit */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSubject;