import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const adminProfile = {
    name: "Sagar Admin",
    email: "sagar.admin@example.com",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/100?img=12",
  };

  const stats = [
    { id: 1, title: "Users", value: 1240, icon: "👥", bgColor: "bg-blue-600" },
    { id: 2, title: "Stores", value: 320, icon: "🏬", bgColor: "bg-green-600" },
    { id: 3, title: "Ratings", value: 5421, icon: "⭐", bgColor: "bg-yellow-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6">
        <h1 className="text-3xl font-extrabold mb-10 text-indigo-700">FivePoint</h1>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/admin/"
            className="py-2 px-4 rounded font-semibold hover:bg-indigo-100 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="py-2 px-4 rounded font-semibold hover:bg-indigo-100 transition"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/stores"
            className="py-2 px-4 rounded font-semibold hover:bg-indigo-100 transition"
          >
            Manage Stores
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <img
              src={adminProfile.avatar}
              alt="Admin Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{adminProfile.name}</p>
              <p className="text-sm text-gray-600">{adminProfile.email}</p>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map(({ id, title, value, icon, bgColor }) => (
            <div
              key={id}
              className={`flex items-center space-x-4 p-6 rounded-lg shadow-md text-white ${bgColor}`}
            >
              <div className="text-4xl">{icon}</div>
              <div>
                <p className="text-lg font-semibold">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Profile Card */}
        <section className="max-w-xl bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
          <h3 className="text-2xl font-semibold mb-4">Profile Information</h3>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {adminProfile.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {adminProfile.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {adminProfile.role}
            </p>
          </div>
        </section>

        {/* Render Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;