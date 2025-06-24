// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import '../src/styles/App.css'; 

import ViewTable from './components/ViewTable';
import Department from './components/Department';
import Staff from './components/Staff';
import Subject from './components/subject';
import Course from './components/course';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('viewTable');

  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [showStaffBelow, setShowStaffBelow] = useState(false);

  // ✅ NEW: department and block state
  const [departmentData, setDepartmentData] = useState({
    department: '',
    block: '',
  });

  const handleLogout = () => {
    setEmail('');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'viewTable':
        return <ViewTable />;

      case 'Department':
        return (
          <>
            <Department
              totalStaff={totalStaff}
              setTotalStaff={setTotalStaff}
              setDepartmentData={setDepartmentData} // ✅ Pass setter
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

      case 'course':
        return <Course subjectCount={subjectCount} />;

      default:
        return <div>Select a page from the sidebar.</div>;
    }
  };

  return (
    <div className="app-container">
      <Header email={email} onLogout={handleLogout} />
      <div className="app-body">
        <Sidebar
          setActivePage={(page) => {
            setActivePage(page);
            setShowStaffBelow(false); // Reset staff page visibility
          }}
        />
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
