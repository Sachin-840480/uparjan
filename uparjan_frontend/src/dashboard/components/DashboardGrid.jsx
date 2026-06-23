import StatsCard from "./StatsCard";

import { dashboardStats } from
"../data/dashboardData";

export default function DashboardGrid() {

  return (
    <div className="dashboard-grid">

      {dashboardStats.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}

    </div>
  );
}