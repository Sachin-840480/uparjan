import "./Dashboard.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <a href="/">Home</a>

      <a href="/farmer/login">Farmer Login</a>

      <a href="/officer/login">Officer Login</a>

      <a href="/msp/login">MSP Login</a>

      <a href="/miller/login">Miller Login</a>

      <a href="/farmer/registration">Farmer Registration</a>
    </div>
  );
}
