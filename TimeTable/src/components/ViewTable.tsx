import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/ViewTable.css';

const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];
const periods = [1, 2, 3, 4, 5, 6, 7];

const ViewTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="view-table-container">
      <div className="controls">
        <select>
          <option>Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>
        <select>
          <option>Semester</option>
          <option>Odd Semester</option>
          <option>Even Semester</option>
        </select>
        <select>
          <option>Section</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
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
        {/* <button className="save-btn">Save</button> */}
        <button className="export-btn" onClick={handleExportPDF}>
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ViewTable;
