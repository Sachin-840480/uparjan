import Header from
"../components/Header";

import Navbar from
"../components/Navbar";

import DashboardGrid from
"../components/DashboardGrid";

import DashboardChart from
"../components/DashboardChart";

import DashboardTable from
"../components/DashboardTable";

import "../components/Dashboard.css";

export default function Dashboard() {

  return (
    <div className="dashboard-page">

      <Header />

      <Navbar />

      <div className="welcome-banner">

        <h2>
          Welcome to e-Uparjan Portal
        </h2>

        <p>
          Modern Procurement Management
          System
        </p>

      </div>

      <DashboardGrid />

      <div className="dashboard-content">

        <DashboardChart />

        <DashboardTable />

      </div>

    </div>
  );
}