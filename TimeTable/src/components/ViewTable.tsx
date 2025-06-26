import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/ViewTable.css';

const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];
const periods = [1, 2, 3, 4, 5, 6, 7];

const ViewTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [year, setYear] = useState('');
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');

  const handleExportPDF = () => {
    if (tableRef.current) {
      const options = {
        filename: 'timetable.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().set(options).from(tableRef.current).save();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);

    switch (selectedYear) {
      case '1st Year':
        setSemesterOptions(['I', 'II']);
        break;
      case '2nd Year':
        setSemesterOptions(['III', 'IV']);
        break;
      case '3rd Year':
        setSemesterOptions(['V', 'VI']);
        break;
      case '4th Year':
        setSemesterOptions(['VII', 'VIII']);
        break;
      default:
        setSemesterOptions([]);
        break;
    }

    setSemester(''); // reset semester on year change
  };

  return (
    <div className="view-table-container">
      <div className="controls">
        <select value={year} onChange={handleYearChange}>
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          {semesterOptions.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <div ref={tableRef}>
        <table className="timetable">
          <thead>
            <tr>
              <th></th>
              {periods.map((period) => (
                <th key={period}>{period}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="day-header">{day}</td>
                {periods.map((period) => (
                  <td key={`${day}-${period}`}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="export-btn" onClick={handleExportPDF}>
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ViewTable;
