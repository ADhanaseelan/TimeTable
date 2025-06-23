// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/login';

import ViewTable from './components/ViewTable';
import Department from './components/Department';
import Staff from './components/Staff';
import Subject from './components/subject';
import Course from './components/course';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('viewTable');

  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [subjectCount, setSubjectCount] = useState<number>(0);

  const handleLoginSuccess = (userEmail: string) => {
    setEmail(userEmail);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'viewTable':
        return <ViewTable />;
      case 'Department':
        return (
          <Department
            setActivePage={setActivePage}
            totalStaff={totalStaff}
            setTotalStaff={setTotalStaff}
          />
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
        <Sidebar setActivePage={setActivePage} />
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default App;
