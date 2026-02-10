import { useEffect, useState } from "react";
import { api } from "../api";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    api.get("/employees").then(r => setEmployees(r.data));
  }, []);

  return (
    <>
      <AttendanceForm employees={employees} onAdd={setSelected} />
      {selected && <AttendanceTable employee_id={selected} />}
    </>
  );
}
