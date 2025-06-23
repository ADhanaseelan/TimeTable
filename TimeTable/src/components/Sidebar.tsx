import React from 'react';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <div className="menu-item" onClick={() => setActivePage('Department')}>Department</div>
      <div className="menu-item" onClick={() => setActivePage('subject')}>Subject</div>
      <div className="menu-item" onClick={() => setActivePage('timetable')}>Timetable</div>
      <div className="menu-item" onClick={() => setActivePage('viewTable')}>View Table</div>
    </div>
  );
};

export default Sidebar;
