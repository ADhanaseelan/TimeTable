import React, { useState } from 'react';
import { FiMenu, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Only one menu can be active

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuClick = (page: string) => {
    setActivePage(page);
    setOpen(false);
    setActiveMenu(null); // close all submenus
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
        <div
          className="menu-item"
          onClick={() => toggleMenu('department')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          DEPARTMENT
          {activeMenu === 'department' ? (
            <FiChevronUp style={{ marginLeft: 8 }} />
          ) : (
            <FiChevronDown style={{ marginLeft: 8 }} />
          )}
        </div>
        {activeMenu === 'department' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('Department')}>ADD STAFF</div>
            <div className="submenu-item" onClick={() => handleMenuClick('viewstaff')}>SHOW STAFF</div>
          </div>
        )}

        {/* Subject Menu */}
        <div
          className="menu-item"
          onClick={() => toggleMenu('subject')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          SUBJECT
          {activeMenu === 'subject' ? (
            <FiChevronUp style={{ marginLeft: 8 }} />
          ) : (
            <FiChevronDown style={{ marginLeft: 8 }} />
          )}
        </div>
        {activeMenu === 'subject' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('subject')}>ADD SUBJECT</div>
            <div className="submenu-item" onClick={() => handleMenuClick('viewSubject')}>VIEW SUBJECT</div>
          </div>
        )}

        {/* Request Menu */}
        

        {/* Static Menu Items */}
        <div className="menu-item" onClick={() => handleMenuClick('Table')}>TIMETABLE</div>
        <div className="menu-item" onClick={() => handleMenuClick('viewTable')}>VIEW TABLE</div>
      <div
          className="menu-item"
          onClick={() => toggleMenu('request')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          REQUEST
          {activeMenu === 'request' ? (
            <FiChevronUp style={{ marginLeft: 8 }} />
          ) : (
            <FiChevronDown style={{ marginLeft: 8 }} />
          )}
        </div>
        {activeMenu === 'request' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('send')}>SEND</div>
            <div className="submenu-item" onClick={() => handleMenuClick('received')}>RECEIVED</div>
          </div>
        )}
      
      </div>
  
    </>
  );
};

export default Sidebar;
