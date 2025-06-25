import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('Department'); // Default to 'department'
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [subjectCount, setSubjectCount] =useState<number>(0);
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
  return <ViewSubject departmentData={departmentData} />;
        

      case 'Table':
        return <Table />;

        
      
        
        case 'viewTable':
        return <ViewTable />;
      default:
        return <div>Select a page from the sidebar.</div>;
    }
  };

  // Show Login page if not logged in
  if (!email) {
    return <Login onLoginSuccess={setEmail} />;
  }

  return (
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
  );
};

export default App;