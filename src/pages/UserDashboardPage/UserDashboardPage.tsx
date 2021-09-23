import { UserDashboardPageSidebar } from "pages/UserDashboardPage/UserDashboardPageSidebar";
import { UserDashboardMainColumn } from "pages/UserDashboardPage/UserDashboardPageMainColumn";

export function UserDashboardPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <UserDashboardPageSidebar />
      <UserDashboardMainColumn />
    </div>
  );
}
