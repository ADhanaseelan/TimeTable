import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import '../styles/Sidebar.css';

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // new state
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser') || '';
    setIsAdmin(loggedUser.toLowerCase() === 'admin');
  }, []);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuClick = (page: string) => {
    if (page === 'pending') {
      navigate('/pending');
    } else if (page === 'admin') {
      navigate('/admin');
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
            {isAdmin && ( // ✅ Show only for admin
              <div className="submenu-item" onClick={() => handleMenuClick('admin')}>
                CREATE-DEPARTMENT
              </div>
            )}
            <div className="submenu-item" onClick={() => handleMenuClick('Department')}>
              ADD STAFF
            </div>
            <div className="submenu-item" onClick={() => handleMenuClick('viewstaff')}>
              SHOW STAFF
            </div>
          </div>
        )}

        {/* Subject Menu */}
        <div className="menu-item" onClick={() => toggleMenu('subject')}>
          <span>SUBJECT</span>
          {activeMenu === 'subject' ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {activeMenu === 'subject' && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => handleMenuClick('subject')}>
              ADD SUBJECT
            </div>
            <div className="submenu-item" onClick={() => handleMenuClick('admin')}>
              VIEW SUBJECT
            </div>
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
            <div className="submenu-item" onClick={() => handleMenuClick('pending')}>
              SEND
            </div>
            <div className="submenu-item" onClick={() => handleMenuClick('received')}>
              RECEIVED
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
