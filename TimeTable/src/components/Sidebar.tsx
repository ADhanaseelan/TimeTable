import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // Import the menu icon
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);

  // Close sidebar when a menu item is clicked (on mobile)
  const handleMenuClick = (page: string) => {
    setActivePage(page);
    setOpen(false);
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
        <div className="menu-item" onClick={() => handleMenuClick('Department')}>Department</div>
        <div className="menu-item" onClick={() => handleMenuClick('subject')}>Subject</div>
        <div className="menu-item" onClick={() => handleMenuClick('timetable')}>Timetable</div>
        <div className="menu-item" onClick={() => handleMenuClick('viewTable')}>View Table</div>
      </div>
    </>
  );
};

export default Sidebar;