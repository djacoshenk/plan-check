import { UserDashboardSidebar } from "pages/UserDashboard/UserDashboardSidebar";
import { UserDashboardMainColumn } from "pages/UserDashboard/UserDashboardMainColumn";

export function UserDashboard() {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <UserDashboardSidebar />
      <UserDashboardMainColumn />
    </div>
  );
}
