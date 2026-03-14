import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../admin-sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Content collapsed={collapsed} />
    </div>
  );
}

function Content({ collapsed }: { collapsed: boolean }) {
  return (
    <main
      className={`flex-1 transition-all duration-300 p-6 ${
        collapsed ? "ml-20" : "ml-64"
      }`}
    >
      <Outlet />
    </main>
  );
}
