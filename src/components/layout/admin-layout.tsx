import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../admin-sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <Content collapsed={collapsed} />
    </div>
  );
}

function Content({ collapsed }: { collapsed: boolean }) {
  return (
    <main
      className={`flex-1 pt-20 transition-all duration-300 md:pt-0 ${
        collapsed ? "md:ml-20" : "md:ml-64"
      }`}
    >
      <Outlet />
    </main>
  );
}
