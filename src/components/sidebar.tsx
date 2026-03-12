"use client";

import {
  CirclePlus,
  Calendar,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
export default function SideBar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CirclePlus, label: "Book a Room", href: "/book-room" },
    { icon: Calendar, label: "My Bookings", href: "/my-bookings" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("phone");
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen shadow-lg flex flex-col transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 border-b px-4">
        {!collapsed && (
          <img
            src="https://cdn.prod.website-files.com/63f783e54b29372e31927b14/63f783e64b29378a90928060_CamTech-Logo.png"
            alt="Logo"
            className="w-50 h-auto object-contain"
          />
        )}

        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-gray-200 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <nav className="space-y-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = location.pathname === href;

            return (
              <button
                key={label}
                onClick={() => navigate(href)}
                title={collapsed ? label : undefined}
                className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition
                ${collapsed ? "justify-center" : ""}
                
                ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />

                {!collapsed && <span className="ml-3">{label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t px-4 py-4">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-100 transition
          ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}
