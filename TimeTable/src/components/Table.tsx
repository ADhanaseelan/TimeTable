import React, { useState, useEffect } from 'react';
import '../styles/Table.css';

interface SubjectRecord {
  subCode: string;
  subjectName: string;
  subjectType: string;
  credit: number;
  staff_assigned?: string;
}

interface StaffMember {
  staffId: string;
  staffName: string;
}

const Table: React.FC = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const [section, setSection] = useState('');
  const [department, setDepartment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [subjects, setSubjects] = useState<SubjectRecord[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [showSubjects, setShowSubjects] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser') || '';
    const isUserAdmin = loggedUser.toLowerCase() === 'admin';
    setIsAdmin(isUserAdmin);

    if (!isUserAdmin) {
      setDepartment(loggedUser);
    }
  }, []);

  const handleNext = async () => {
    if (!year || !semester || !section || !department) {
      alert('Please fill all fields!');
      return;
    }

    try {
      const subjectRes = await fetch(
        `https://localhost:7244/api/StaffSubject/subjects?year=${encodeURIComponent(year)}&sem=${encodeURIComponent(semester)}&departmentId=${encodeURIComponent(department)}`
      );
      const subjectData = await subjectRes.json();

      const staffRes = await fetch(
        `https://localhost:7244/api/StaffSubject/staff?departmentId=${encodeURIComponent(department)}`
      );
      const staffData = await staffRes.json();

      const subjectsWithStaff = subjectData.map((subject: SubjectRecord) => ({
        ...subject,
        staff_assigned: ''
      }));

      setSubjects(subjectsWithStaff);
      setStaffList(staffData);
      setShowSubjects(true);
    } catch (err) {
      console.error('Error fetching subjects or staff:', err);
    }
  };

  const handleStaffSelect = (subjectIndex: number, staffValue: string) => {
    const updated = [...subjects];
    updated[subjectIndex].staff_assigned = staffValue;
    setSubjects(updated);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setSemester('');

    switch (selectedYear) {
      case 'First Year':
        setSemesterOptions(['I', 'II']);
        break;
      case 'Second Year':
        setSemesterOptions(['III', 'IV']);
        break;
      case 'Third Year':
        setSemesterOptions(['V', 'VI']);
        break;
      case 'Fourth Year':
        setSemesterOptions(['VII', 'VIII']);
        break;
      default:
        setSemesterOptions([]);
        break;
    }
  };

  return (
    <div className="table-wrapper">
      <div className="form-grid">
        <div className="form-row">
          <label>Year</label>
          <select value={year} onChange={handleYearChange}>
            <option value="">Select</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </select>
        </div>

        <div className="form-row">
          <label>Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select</option>
            {semesterOptions.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="form-row">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            disabled={!isAdmin}
            placeholder={isAdmin ? 'Enter department' : ''}
          />
        </div>
      </div>

      <div className="submit-row">
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>

      {showSubjects && (
        <div className="subject-list">
          <h3>Subjects Found: {subjects.length}</h3>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Credit</th>
                <th>Staff</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td>{subj.subCode}</td>
                  <td>{subj.subjectName}</td>
                  <td>{subj.subjectType}</td>
                  <td>{subj.credit}</td>
                  <td>
                    <select
                      value={subj.staff_assigned || ''}
                      onChange={(e) => handleStaffSelect(idx, e.target.value)}
                    >
                      <option value="">Select</option>
                      {staffList.map((s) => (
                        <option key={s.staffId} value={`${s.staffName} (${s.staffId})`}>
                          {s.staffName} ({s.staffId})
                        </option>
                      ))}
                    </select>
                    
                  </td>
                </tr>

                
              ))}
            </tbody>
          </table>
          <div className="submit-row">
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
        </div>
      )}
    </div>
  );
};

export default Table;
