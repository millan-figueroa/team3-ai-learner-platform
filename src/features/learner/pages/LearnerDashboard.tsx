import { useState } from "react";
import SideNav from "../../../shared/components/SideNav";
import navigationConfig from "../../../data/navigationConfig.json";
import LearnerHeader from "../components/LearnerHeader";
// import AIChatAssistant from "../components/AIChatAssistant";
import ProgressSnapshot from "../components/Snapshot";

export default function LearnerDashboard({ username }: { username?: string }) {
  const [activeTab, setActiveTab] = useState(
    navigationConfig.learner.defaultTab
  );
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <LearnerHeader username={username} />

      <div className="flex w-full">
        <SideNav
          tabs={navigationConfig.learner.tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />

        <main className="flex-1 p-6">
          {/* TODO: render tab content here (DashboardTab, HelpTab, etc.) */}
          <div className="bg-white rounded-xl shadow p-6">
            <ProgressSnapshot />
          </div>
        </main>
      </div>
    </div>
  );
}
