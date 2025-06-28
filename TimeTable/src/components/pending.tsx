import React, { useEffect, useState } from 'react';
import '../styles/pending.css';

interface PendingRequest {
  id: number;
  fromDepartment: string;
  toDepartment: string;
  subjectCode: string;
  subjectName: string;
  year: string;
  semester: string;
  section: string;
  status: string;
}

const Pending: React.FC = () => {
  const [pendingList, setPendingList] = useState<PendingRequest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);

  useEffect(() => {
    // Fetch pending requests from backend
    const fetchPending = async () => {
      try {
        const res = await fetch('https://localhost:7244/api/StaffRequestData/pending');
        const data = await res.json();
        setPendingList(data || []);
      } catch (err) {
        console.error('Error fetching pending requests:', err);
      }
    };
    fetchPending();
  }, []);

  const handleAction = async (action: 'approve' | 'reject') => {
    if (!selectedRequest) return;
    try {
      const res = await fetch(`https://localhost:7244/api/StaffRequestData/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedRequest.id }),
      });
      if (!res.ok) throw new Error('Failed to update request');
      setPendingList(list => list.filter(req => req.id !== selectedRequest.id));
      setShowModal(false);
      setSelectedRequest(null);
      alert(`Request ${action === 'approve' ? 'approved' : 'rejected'}!`);
    } catch (err) {
      alert('Action failed.');
    }
  };

  return (
    <div className="table-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Pending Requests</h2>
      <div className="subject-list">
        <table>
          <thead>
            <tr>
              <th>From Dept</th>
              <th>To Dept</th>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Section</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingList.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#888' }}>No pending requests</td>
              </tr>
            ) : (
              pendingList.map(req => (
                <tr key={req.id}>
                  <td>{req.fromDepartment}</td>
                  <td>{req.toDepartment}</td>
                  <td>{req.subjectCode}</td>
                  <td>{req.subjectName}</td>
                  <td>{req.year}</td>
                  <td>{req.semester}</td>
                  <td>{req.section}</td>
                  <td>{req.status}</td>
                  <td>
                    <button
                      className="wait-btn"
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowModal(true);
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedRequest && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Review Request</h3>
            <p><strong>From:</strong> {selectedRequest.fromDepartment}</p>
            <p><strong>To:</strong> {selectedRequest.toDepartment}</p>
            <p><strong>Subject:</strong> {selectedRequest.subjectCode} - {selectedRequest.subjectName}</p>
            <p><strong>Year:</strong> {selectedRequest.year}</p>
            <p><strong>Semester:</strong> {selectedRequest.semester}</p>
            <p><strong>Section:</strong> {selectedRequest.section}</p>
            <div className="modal-buttons">
              <button onClick={() => handleAction('approve')}>Approve</button>
              <button onClick={() => handleAction('reject')}>Reject</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;