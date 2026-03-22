"use client";

import {
  CirclePlus,
  Calendar,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
export default function SideBar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event?: MediaQueryListEvent) => {
      const matches = event?.matches ?? mediaQuery.matches;
      setIsMobile(matches);
      if (!matches) {
        setMobileOpen(false);
      }
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, [setMobileOpen]);

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile, location.pathname, setMobileOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
      return;
    }

    setCollapsed(!collapsed);
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CirclePlus, label: "Book a Room", href: "/book-room" },
    { icon: Calendar, label: "My Bookings", href: "/my-bookings" },
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("fullName");
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("phone");
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <button
        type="button"
        aria-label="Open user menu"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-xl border border-slate-200 bg-white p-3 shadow-lg md:hidden"
      >
        <Menu size={20} />
      </button>

      <div
        className={`fixed top-0 left-0 z-50 flex h-screen flex-col border-r bg-white shadow-lg transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${collapsed ? "md:w-20" : "md:w-64"}
        w-72`}
      >
        <div className="flex items-center justify-between h-20 border-b px-4">
          {(!collapsed || isMobile) && (
            <img
              src="https://cdn.prod.website-files.com/63f783e54b29372e31927b14/63f783e64b29378a90928060_CamTech-Logo.png"
              alt="Logo"
              className="w-50 h-auto object-contain"
            />
          )}

          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg hover:bg-gray-200 ${
              collapsed && !isMobile ? "mx-auto" : ""
            }`}
          >
            {isMobile ? (
              <X size={20} />
            ) : (
              <ChevronRight
                size={20}
                className={`transition-transform ${collapsed ? "" : "rotate-180"}`}
              />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6">
          <nav className="space-y-1">
            {navItems.map(({ icon: Icon, label, href }) => {
              const isActive =
                href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(href);

              return (
                <button
                  key={label}
                  onClick={() => {
                    navigate(href);
                    if (isMobile) {
                      setMobileOpen(false);
                    }
                  }}
                  title={collapsed && !isMobile ? label : undefined}
                  className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium transition
        ${collapsed && !isMobile ? "justify-center" : ""}
        ${isActive ? "bg-primary text-white font-semibold" : "hover:bg-gray-100 text-gray-700"}
      `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {(!collapsed || isMobile) && <span className="ml-3">{label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t px-4 py-4">
          <button
            onClick={handleLogout}
            title={collapsed && !isMobile ? "Logout" : undefined}
            className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-100 transition
          ${collapsed && !isMobile ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {(!collapsed || isMobile) && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}
