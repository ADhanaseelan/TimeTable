// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import ViewTable from './components/ViewTable';
import Department from './components/Department';
import Staff from './components/Staff';
import Subject from './components/subject';
import Table from './components/Table';

import './styles/App.css';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('viewTable');
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [showStaffBelow, setShowStaffBelow] = useState(false);

  const handleLogout = () => setEmail('');

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
              onShowStaff={() => setShowStaffBelow(true)}
            />
            {showStaffBelow && <Staff totalStaff={totalStaff} />}
          </>
        );

      case 'Staff':
        return <Staff totalStaff={totalStaff} />;

      case 'subject':
        return (
          <Subject
            subjectCount={subjectCount}
            setSubjectCount={setSubjectCount}
            setActivePage={setActivePage}
          />
        );

      case 'Table':
        return <Table />;

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
            setShowStaffBelow(false); // reset state when navigating
          }}
        />
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
