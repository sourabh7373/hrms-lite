import { useState } from "react";
import { api } from "../api";

export default function EmployeeForm({ onAdd }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/employees", form);
    setForm({ employee_id:"", full_name:"", email:"", department:"" });
    onAdd();
  };

  return (
    <form onSubmit={submit}>
      <h3>Add Employee</h3>
      <input placeholder="Employee ID" value={form.employee_id}
        onChange={e => setForm({...form, employee_id: e.target.value})} />
      <input placeholder="Full Name" value={form.full_name}
        onChange={e => setForm({...form, full_name: e.target.value})} />
      <input placeholder="Email" value={form.email}
        onChange={e => setForm({...form, email: e.target.value})} />
      <input placeholder="Department" value={form.department}
        onChange={e => setForm({...form, department: e.target.value})} />
      <button>Add</button>
    </form>
  );
}
