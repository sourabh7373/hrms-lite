import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>HRMS Lite</h1>

      <hr />

      <section>
        <h2>Employee Management</h2>
        <Employees />
      </section>

      <hr />

      <section>
        <h2>Attendance Management</h2>
        <Attendance />
      </section>
    </div>
  );
}

export default App;
