import { useState } from "react";
import { api } from "../api";

export default function AttendanceForm({ employees, onAdd }) {
  const [record, setRecord] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const submit = async (e) => {
  e.preventDefault();

  if (!record.employee_id || !record.date) {
    alert("Please select employee and date");
    return;
  }

  try {
    // Check existing attendance
    const res = await api.get(
      `/attendance/${record.employee_id}`
    );

    const alreadyMarked = res.data.find(
      (a) => a.date === record.date
    );

    if (alreadyMarked) {
      alert("Attendance already marked for this date");
      return;
    }

    await api.post("/attendance", record);
    onAdd(record.employee_id);
    alert("Attendance marked");

  } catch (err) {
    console.error(err);
    alert("Failed to mark attendance");
  }
};


  return (
    <form onSubmit={submit}>
      <h3>Mark Attendance</h3>
      <select onChange={e => setRecord({...record, employee_id: e.target.value})}>
        <option value="">Select Employee</option>
        {employees.map(e =>
          <option key={e.employee_id} value={e.employee_id}>
            {e.full_name}
          </option>
        )}
      </select>
      <input type="date" onChange={e => setRecord({...record, date: e.target.value})} />
      <select onChange={e => setRecord({...record, status: e.target.value})}>
        <option>Present</option>
        <option>Absent</option>
      </select>
      <button>Save</button>
    </form>
  );
}
