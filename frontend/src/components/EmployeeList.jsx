import { api } from "../api";

export default function EmployeeList({ employees, onRefresh }) {
  const remove = async (id) => {
    await api.delete(`/employees/${id}`);
    onRefresh();
  };

  return (
    <div>
      <h3>Employees</h3>
      {employees.length === 0 && <p>No employees found</p>}
      <ul>
        {employees.map(e => (
          <li key={e.employee_id}>
            {e.full_name} ({e.department})
            <button onClick={() => remove(e.employee_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
