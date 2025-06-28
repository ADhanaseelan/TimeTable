import React, { useEffect, useState } from 'react';
import './pending.css';

interface SubjectResultDto {
  subCode: string;
  subjectName: string;
  subjectType: string;
  credit: number;
}

interface StaffResultDto {
  staffId: string;
  staffName: string;
}

interface ApprovalRecord {
  subject: SubjectResultDto;
  staff: StaffResultDto;
}

const ApprovalPage: React.FC = () => {
  const [approvalData, setApprovalData] = useState<ApprovalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    const fetchApprovalData = async () => {
      try {
        const response = await fetch('https://localhost:7244/api/StaffRequestData/approvalList');
        if (!response.ok) {
          throw new Error('Failed to fetch approval data');
        }
        const data = await response.json();
        setApprovalData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching approval data:', error);
        setLoading(false);
      }
    };

    fetchApprovalData();
  }, []);

  return (
    <div className="approval-container">
      <h2>✔️ Request Submitted Successfully</h2>
      <p>The following subject-staff assignments are pending HOD approval:</p>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table className="approval-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Type</th>
              <th>Credit</th>
              <th>Staff Name</th>
            </tr>
          </thead>
          <tbody>
            {approvalData.map((record, index) => (
              <tr key={index}>
                <td>{record.subject.subCode}</td>
                <td>{record.subject.subjectName}</td>
                <td>{record.subject.subjectType}</td>
                <td>{record.subject.credit}</td>
                <td>{record.staff.staffId}</td>
                <td>{record.staff.staffName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovalPage;
