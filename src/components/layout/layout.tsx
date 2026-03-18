import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content collapsed={collapsed} />
    </div>
  );
}

function Content({ collapsed }: { collapsed: boolean }) {
  return (
    <main
      className={`flex-1 transition-all duration-300 ${
        collapsed ? "ml-20" : "ml-64"
      }`}
    >
      <Outlet />
    </main>
  );
}
