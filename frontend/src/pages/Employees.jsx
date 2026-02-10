import { useEffect, useState } from "react";
import { api } from "../api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <EmployeeForm onAdd={load} />
      <EmployeeList employees={employees} onRefresh={load} />
    </>
  );
}
