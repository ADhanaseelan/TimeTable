import React, { useState, useEffect } from 'react';
import '../styles/Department.css'; // You can keep using this if the styles fit

const Admin: React.FC = () => {
  const [departmentId, setDepartmentId] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [block, setBlock] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser') || '';
    if (loggedUser.toLowerCase() !== 'admin') {
      alert('Unauthorized access!');
    }
  }, []);

  const handlePasswordFocus = () => {
    if (!password && departmentId) {
      const generated = departmentId.toUpperCase() + '123';
      setPassword(generated);
    }
  };

  const handleSubmit = async () => {
    if (!departmentId || !departmentName || !block || !password) {
      alert('Please fill all fields!');
      return;
    }

    try {
      const response = await fetch('https://localhost:7244/api/Login/add-department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          departmentId: departmentId,
          departmentName: departmentName,
          block: block,
          password: password
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert('✅ Department created successfully!');
        // Optional: Clear form
        setDepartmentId('');
        setDepartmentName('');
        setBlock('');
        setPassword('');
      } else {
        const err = await response.json();
        alert('❌ Error: ' + err.message);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to connect to the server.');
    }
  };

  return (
    <div className="department-wrapper">
      <h2 className="grid-title">Create New Department</h2>

      <div className="department-form-row">
        <div className="form-item">
          <label htmlFor="departmentId" className="department-label">Department ID</label>
          <input
            type="text"
            id="departmentId"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value.toUpperCase())}
            placeholder="e.g., CSE"
          />
        </div>

        <div className="form-item">
          <label htmlFor="departmentName" className="department-label">Department Name</label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value.toUpperCase())}
            placeholder="e.g., COMPUTER SCIENCE"
          />
        </div>

        <div className="form-item">
          <label htmlFor="block" className="department-label">Block</label>
          <input
            type="text"
            id="block"
            value={block}
            onChange={(e) => setBlock(e.target.value.toUpperCase())}
            placeholder="e.g., Block A"
          />
        </div>

        <div className="form-item">
          <label htmlFor="password" className="department-label">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onFocus={handlePasswordFocus}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Generate or enter password"
          />
        </div>
      </div>

      <div className="button-container">
        <button className="grid-button" onClick={handleSubmit}>Create Department</button>
      </div>
    </div>
  );
};

export default Admin;
