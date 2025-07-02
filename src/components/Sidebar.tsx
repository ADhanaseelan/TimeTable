import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate(); // <-- hook to navigate programmatically

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuClick = (page: string) => {
    if (page === 'pending') {
      navigate('/pending'); // <-- Go to Pending.tsx
    } else if (page === 'received') {
      setActivePage(page); // handled by renderContent in App.tsx
    } else {
      setActivePage(page);
    }
    setOpen(false);
    setActiveMenu(null);
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
        {/* Department Menu */}
        <div className="menu-item" onClick={() => toggleMenu('department')}>
          <span>DEPARTMENT</span>
          {activeMenu === 'department' ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {activeMenu === 'department' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('Department')}>ADD STAFF</div>
            <div className="submenu-item" onClick={() => handleMenuClick('viewstaff')}>SHOW STAFF</div>
          </div>
        )}

        {/* Subject Menu */}
        <div className="menu-item" onClick={() => toggleMenu('subject')}>
          <span>SUBJECT</span>
          {activeMenu === 'subject' ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {activeMenu === 'subject' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('subject')}>ADD SUBJECT</div>
            <div className="submenu-item" onClick={() => handleMenuClick('viewSubject')}>VIEW SUBJECT</div>
          </div>
        )}

        {/* Timetable */}
        <div className="menu-item" onClick={() => handleMenuClick('Table')}>TIMETABLE</div>
        <div className="menu-item" onClick={() => handleMenuClick('viewTable')}>VIEW TABLE</div>

        {/* Request Menu */}
        <div className="menu-item" onClick={() => toggleMenu('request')}>
          <span>REQUEST</span>
          {activeMenu === 'request' ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {activeMenu === 'request' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('pending')}>SEND</div>
            <div className="submenu-item" onClick={() => handleMenuClick('received')}>RECEIVED</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
