
import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader toggleSidebar={toggleSidebar} />
        <main className={cn(
          "flex-1 overflow-y-auto p-6",
          "transition-all duration-300",
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
