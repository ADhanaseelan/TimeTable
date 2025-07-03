import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import '../styles/ViewTable.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const periods = [1, 2, 3, 4, 5, 6, 7];

// Changed key type from number to string to match backend response
interface TimetableSlot {
  Day: string;
  HourlySlots: { [key: string]: string };
}

const ViewTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [year, setYear] = useState('');
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [timetableData, setTimetableData] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    setSemester('');
  };
const handleFetchTimetable = async () => {
  if (!year || !semester || !section) {
    alert("⚠️ Please select Year, Semester, and Section!");
    return;
  }

  setLoading(true);
  setError('');
  setTimetableData([]);

  try {
    const department = 'CSE';
    const encodedYear = encodeURIComponent(year.trim());
    const encodedSemester = encodeURIComponent(semester.trim());
    const encodedSection = encodeURIComponent(section.trim());

    const url = `https://localhost:7244/api/CrossDepartmentAssignments/getCrossTimetable?toDepartment=${department}&year=${encodedYear}&semester=${encodedSemester}&section=${encodedSection}`;
    console.log("📡 Fetching timetable from:", url);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'Failed to fetch timetable');
    }

    // 🔁 Normalize backend keys to match expected frontend format
    const normalizedData: TimetableSlot[] = (data.timetable || []).map((entry: any) => ({
      Day: entry.day,
      HourlySlots: entry.hourlySlots,
    }));

    setTimetableData(normalizedData);
  } catch (err: any) {
    console.error(err);
    setError(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="view-table-container">
      <div className="controls">
        <select value={year} onChange={handleYearChange}>
          <option value="">Select Year</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
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

        <button onClick={handleFetchTimetable}>📥 View Timetable</button>
      </div>

      {loading && <p>📡 Loading timetable...</p>}
      {error && <p className="error">❌ {error}</p>}

      <div ref={tableRef}>
        <table className="timetable">
          <thead>
            <tr>
              <th>Day</th>
              {periods.map((period) => (
                <th key={period}>Period {period}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const row = timetableData.find((slot) => slot.Day === day);
              return (
                <tr key={day}>
                  <td className="day-header">{day}</td>
                  {periods.map((period) => (
                    <td key={`${day}-${period}`}>
                      {row?.HourlySlots?.[period.toString()] || '---'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="export-btn" onClick={handleExportPDF}>
          📤 Export to PDF
        </button>
      </div>
    </div>
  );
};

export default ViewTable;
