import React, { useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "User" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Store Owner" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Admin" },
  ]);

  const [filter, setFilter] = useState({ name: "", email: "", role: "" });
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      user.email.toLowerCase().includes(filter.email.toLowerCase()) &&
      (filter.role === "" || user.role === filter.role)
  );

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return alert("Name and Email required");
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setNewUser({ name: "", email: "", role: "User" });
    setIsFormVisible(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow mt-6 relative min-h-[500px]">

      <h3 className="text-xl font-semibold mb-4">User Management</h3>

      {/* Blue round + button top-right */}
      <button
        onClick={() => setIsFormVisible(true)}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-blue-600 text-white text-3xl font-bold hover:bg-blue-700 flex items-center justify-center"
        aria-label="Add User"
        title="Add User"
      >
        +
      </button>

      {/* Centered form modal with blur background */}
      {isFormVisible && (
        <div
          onClick={() => setIsFormVisible(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
        >
          <form
            onClick={e => e.stopPropagation()}
            onSubmit={handleAddUser}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md grid grid-cols-1 gap-4"
          >
            <h4 className="text-lg font-semibold mb-4">Add New User</h4>
            <input
              type="text"
              placeholder="Name"
              className="border px-3 py-2 rounded"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              autoFocus
            />
            <input
              type="email"
              placeholder="Email"
              className="border px-3 py-2 rounded"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <select
              className="border px-3 py-2 rounded"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Store Owner">Store Owner</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="px-4 py-2 border rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Name"
          className="border px-3 py-2 rounded w-1/3"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by Email"
          className="border px-3 py-2 rounded w-1/3"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
        />
        <select
          className="border px-3 py-2 rounded w-1/3"
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Store Owner">Store Owner</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link to={`${user.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;