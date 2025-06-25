import React, { useState } from 'react';
import { FiMenu, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  // Close sidebar when a menu item is clicked (on mobile)
  const handleMenuClick = (page: string) => {
    setActivePage(page);
    setOpen(false);
    setDeptOpen(false);
    setSubjectOpen(false);
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <FiMenu size={28} color="#003366" />
      </button>
      <div className={`sidebar${open ? ' open' : ''}`}>
        {/* Department with submenu */}
        <div
          className="menu-item"
          onClick={() => setDeptOpen((prev) => !prev)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          DEPARTMENT
          {deptOpen ? <FiChevronUp style={{ marginLeft: 8 }} /> : <FiChevronDown style={{ marginLeft: 8 }} />}
        </div>
        {deptOpen && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('Department')}>ADD STAFF</div>
            <div className="submenu-item" onClick={() => handleMenuClick('Staff')}>SHOW STAFF</div>
          </div>
        )}

        {/* Subject with submenu */}
        <div
          className="menu-item"
          onClick={() => setSubjectOpen((prev) => !prev)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          SUBJECT
          {subjectOpen ? <FiChevronUp style={{ marginLeft: 8 }} /> : <FiChevronDown style={{ marginLeft: 8 }} />}
        </div>
        {subjectOpen && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('subject')}>ADD SUBJECT</div>
            <div className="submenu-item" onClick={() => handleMenuClick('Table')}>VIEW SUBJECT</div>
          </div>
        )}

        {/* Other main menu items */}
        <div className="menu-item" onClick={() => handleMenuClick('Table')}>TIMETABLE</div>
        <div className="menu-item" onClick={() => handleMenuClick('viewTable')}>VIEW TABLE</div>
      </div>
    </>
  );
};

export default Sidebar;