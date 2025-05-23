import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const dummyUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "User" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Store Owner", rating: 4.3 },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Admin" },
];

const UserDetail = () => {
  const {allUsers} = useUser();
  const { id } = useParams();
  const user = allUsers.find(u => u.id === parseInt(id));

  if (!user) {
    return <div className="p-6 text-center">User not found</div>;
  }

  return (
    <div className="p-6 bg-white rounded shadow mt-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">User Details</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.role === "Store Owner" && (
        <p><strong>Rating:</strong> {user.rating ?? "No rating available"}</p>
      )}
    </div>
  );
};

export default UserDetail;