import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const adminProfile = {
    name: "Sagar Admin",
    email: "sagar.admin@example.com",
    role: "Administrator",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-2">Admin Profile</h3>
        <p><strong>Name:</strong> {adminProfile.name}</p>
        <p><strong>Email:</strong> {adminProfile.email}</p>
        <p><strong>Role:</strong> {adminProfile.role}</p>
      </div>

      <div className="space-x-4">
        <Link to="users" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Manage Users
        </Link>

        <Link to="stores" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Manage Stores
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;
