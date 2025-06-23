import React from 'react';
import '../styles/subject.css';

interface SubjectProps {
  subjectCount: number;
  setSubjectCount: (value: number) => void;
  setActivePage: (page: string) => void;
}

const Subject: React.FC<SubjectProps> = ({ subjectCount, setSubjectCount, setActivePage }) => {
  return (
    <div className="subject-wrapper">
      <h2 className="grid-title">Subject Details</h2>

      <div className="subject-grid-row">
        <div className="form-item">
          <label htmlFor="year" className="subject-label">Year</label>
          <select id="year">
            <option value="">Select Year</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="sem" className="subject-label">Semester</label>
          <select id="sem">
            <option value="">Select Semester</option>
            <option value="odd">Odd Semester</option>
            <option value="even">Even Semester</option>
          </select>
        </div>
      </div>

      <div className="form-item subject-count">
        <label htmlFor="subjectCount" className="subject-label">Subject Count</label>
        <input
          type="number"
          id="subjectCount"
          value={subjectCount}
          onChange={(e) => setSubjectCount(Number(e.target.value))}
        />
      </div>

      <button className="grid-button" onClick={() => setActivePage('course')}>Next</button>
    </div>
  );
};

export default Subject;
