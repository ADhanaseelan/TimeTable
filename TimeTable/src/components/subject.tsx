import React, { useState } from 'react';
import '../styles/subject.css';

interface SubjectProps {
  subjectCount: number;
  setSubjectCount: (value: number) => void;
  setActivePage: (page: string) => void;
}

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
  const [selectedSemester, setSelectedSemester] = useState('');
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

  const handleSave = async () => {
    try {
      for (const subj of subjects) {
        const body = {
          sub_code: subj.code,
          subject_name: subj.name,
          year: selectedYear,
          sem: selectedSemester,
          department: selectedDept,
          department_id: selectedDept, // assuming same for now
          subject_type: subj.type,
          credit: subj.credit,
        };
console.log(body);
        const response = await fetch('https://localhost:7244/api/SubjectData/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Failed to save subject: ${subj.name}`);
        }
      }

      alert('All subjects saved successfully!');
      setActivePage('course');
    } catch (error) {
      console.error('Save failed:', error);
      alert('Error saving one or more subjects.');
    }
  };

  return (
    <div className="subject-wrapper">
      <h2 className="grid-title">Subject Details</h2>

      <div className="subject-grid-row">
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
    </div>
  );
};

export default Subject;
