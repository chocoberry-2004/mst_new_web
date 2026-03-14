import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";



function Index () {

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 w-full transition-all duration-300 ease-in-out">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">M.S.T Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to the administrative portal</p>
        </div>
        <div className="p-6">
          <Outlet /> {/* This will render the nested routes */}
        </div>
      </main>
    </div>
  );
}

export default Index;