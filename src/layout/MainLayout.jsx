import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="relative h-dvh overflow-hidden bg-secondary text-white">
      <div className="ambient-orb top-[-120px] left-[-80px] h-72 w-72 bg-primary/25 animate-pulse-slow" />
      <div className="ambient-orb right-[-80px] bottom-[-120px] h-80 w-80 bg-cyan/15 animate-pulse-slow" />
      <div className="ambient-orb top-1/3 right-1/4 h-56 w-56 bg-deep/40 animate-pulse-slow" />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="relative z-10 flex h-full min-h-0 flex-col lg:pl-[280px]">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
