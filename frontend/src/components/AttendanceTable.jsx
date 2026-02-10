import { useEffect, useState } from "react";
import { api } from "../api";

export default function AttendanceTable({ employee_id }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (employee_id)
      api.get(`/attendance/${employee_id}`).then(r => setRecords(r.data));
  }, [employee_id]);

  return (
    <div>
      <h3>Attendance Records</h3>
      <ul>
        {records.map(r => (
          <li key={r.id}>
            {r.date} - {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
