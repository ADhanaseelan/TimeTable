import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../src/styles/App.css';

import ViewTable from './components/ViewTable';
import Department from './components/Department';
import Staff from './components/Staff';
import Subject from './components/subject';
import Table from './components/Table';
import Login from './components/login';
import ViewSubject from './components/ViewSubject';
import ViewStaff from './components/viewstaff';
import Pending from '../src/components/pending';

// Dummy Approval Page Component
const ApprovalPage: React.FC = () => (
  <div className="approval-page">
    <h2>Request Submitted</h2>
    <p>Your assignment was saved and is waiting for approval from the HOD.</p>
  </div>
);

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('Department');
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [showStaffBelow, setShowStaffBelow] = useState(false);
  const [departmentData, setDepartmentData] = useState({
    department: '',
    departmentName: '',
    block: '',
  });

  const handleLogout = () => {
    setEmail('');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Department':
        return (
          <>
            <Department
              totalStaff={totalStaff}
              setTotalStaff={setTotalStaff}
              setDepartmentData={setDepartmentData}
              onShowStaff={() => setShowStaffBelow(true)}
            />
            {showStaffBelow && (
              <Staff totalStaff={totalStaff} departmentData={departmentData} />
            )}
          </>
        );
      case 'Staff':
        return <Staff totalStaff={totalStaff} departmentData={departmentData} />;
      case 'subject':
        return (
          <Subject
            subjectCount={subjectCount}
            setSubjectCount={setSubjectCount}
            setActivePage={setActivePage}
          />
        );
      case 'viewSubject':
        return <ViewSubject />;
      case 'Table':
        return <Table />;
      case 'viewstaff':
        return <ViewStaff />;
      case 'viewTable':
        return <ViewTable />;
      default:
        return <div>Select a page from the sidebar.</div>;
    }
  };

  if (!email) {
    return <Login onLoginSuccess={setEmail} />;
  }

  return (
    <Router>
      <Routes>
        {/* Main App Layout */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <Header email={email} onLogout={handleLogout} />
              <div className="app-body">
                <Sidebar
                  setActivePage={(page) => {
                    setActivePage(page);
                    setShowStaffBelow(false);
                  }}
                />
                <div className="main-content">{renderContent()}</div>
              </div>
            </div>
          }
        />

        {/* Approval Page Route */}
        <Route path="/approval" element={<ApprovalPage />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </Router>
  );
};

export default App;

