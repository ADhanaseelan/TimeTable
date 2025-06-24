import React, { useState } from 'react';
import '../styles/subject.css';

interface SubjectProps {
  subjectCount: number;
  setSubjectCount: (value: number) => void;
  setActivePage: (page: string) => void;
}

<<<<<<< HEAD
const Subject: React.FC<SubjectProps> = ({ subjectCount, setSubjectCount, setActivePage }) => {
  const [year, setYear] = useState('');
  const [sem, setSem] = useState('');

  const handleSubmit = async () => {
    if (!year || !sem || subjectCount <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const response = await fetch('https://localhost:7244/api/SubjectData/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: parseInt(year),
          sem: sem, // OR use actual sem value if backend expects it
          subjectCount: subjectCount
        }),
      });

      const data = await response.json();
      console.log("✅ Success:", data);
      setActivePage('course'); // move to next page if success
    } catch (error) {
      console.error("❌ Error:", error);
    }
=======
interface SubjectItem {
  code: string;
  name: string;
  type: 'Theory' | 'Lab' | 'Embedded';
  credit: number;
}

const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
const semesters = ['oddsemester', 'even semester'];

const Subject: React.FC<SubjectProps> = ({ setActivePage }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(''); // <-- Add this
  const [selectedDept, setSelectedDept] = useState('');
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<SubjectItem>({
    code: '',
    name: '',
    type: 'Theory',
    credit: 0,
  });

  const freezeSelection = !!selectedYear && !!selectedDept && !!selectedSemester;

  const handleAddSubject = () => {
    if (!form.code || !form.name || !form.credit) return;
    setSubjects([...subjects, form]);
    setForm({ code: '', name: '', type: 'Theory', credit: 0 });
    setShowForm(false);
  };

  const handleSave = () => {
    alert('Subjects saved!');
    setActivePage('course');
>>>>>>> b7d66b51065f6037cacd7d3955e966513735e27d
  };

  return (
    <div className="subject-wrapper">
      <h2 className="grid-title">Subject Details</h2>

      <div className="subject-grid-row">
<<<<<<< HEAD
        <div className="form-item">
          <label htmlFor="year" className="subject-label">Year</label>
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="sem" className="subject-label">Semester</label>
          <select id="sem" value={sem} onChange={(e) => setSem(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="odd">Odd Semester</option>
            <option value="even">Even Semester</option>
=======
        <div className="subject-grid-item">
          <label className="subject-label">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="dropdown"
            disabled={freezeSelection}
          >
            <option value="">Select</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="subject-grid-item">
          <label className="subject-label">Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="dropdown"
            disabled={freezeSelection}
          >
            <option value="">Select</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
        <div className="subject-grid-item">
          <label className="subject-label">Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="dropdown"
            disabled={freezeSelection}
          >
            <option value="">Select</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
>>>>>>> b7d66b51065f6037cacd7d3955e966513735e27d
          </select>
        </div>
      </div>

      <div className="subject-add-btn-row">
        <button
          className="add-subject-btn"
          onClick={() => setShowForm(!showForm)}
          disabled={!selectedYear || !selectedDept || !selectedSemester}
        >
          {showForm ? 'Cancel' : 'Add Subject'}
        </button>
      </div>

<<<<<<< HEAD
      <button className="grid-button" onClick={handleSubmit}>Next</button>
=======
      {showForm && (
        <div className="subject-form">
          <label className="subject-label">Subject Code</label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />

          <label className="subject-label">Subject Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label className="subject-label">Subject Type</label>
          <div className="subject-type-group">
            {['Theory', 'Lab', 'Embedded'].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={form.type === type}
                  onChange={() => setForm({ ...form, type: type as SubjectItem['type'] })}
                />
                {type}
              </label>
            ))}
          </div>

          <label className="subject-label">Credit</label>
          <input
            type="number"
            value={form.credit === 0 ? '' : form.credit}
            min={1}
            onChange={(e) => setForm({ ...form, credit: Number(e.target.value) })}
          />

          <button className="save-btn" onClick={handleAddSubject}>Add</button>
        </div>
      )}

      {subjects.length > 0 && (
        <div className="subject-list">
          <h3>Added Subjects</h3>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td>{subj.code}</td>
                  <td>{subj.name}</td>
                  <td>{subj.type}</td>
                  <td>{subj.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      )}
>>>>>>> b7d66b51065f6037cacd7d3955e966513735e27d
    </div>
  );     
};

export default Subject;