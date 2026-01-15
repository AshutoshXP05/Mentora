// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar har page par dikhega */}
      <Navbar />

      {/* Page-specific content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
