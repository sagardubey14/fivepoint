import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const storesData = [
  { id: 1, name: "Coffee Hub", rating: 4.2, img: "https://picsum.photos/id/1011/400/300" },
  { id: 2, name: "Tech Lounge", rating: 3.8, img: "https://picsum.photos/id/1015/400/300" },
  { id: 3, name: "Book Haven", rating: 4.5, img: "https://picsum.photos/id/1021/400/300" },
  { id: 4, name: "Burger Point", rating: 4.1, img: "https://picsum.photos/id/1035/400/300" },
  { id: 5, name: "Fitness Zone", rating: 3.9, img: "https://picsum.photos/id/1041/400/300" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stores] = useState(storesData);
  const [userInfo, setUserInfo] = useState({
    name: "Normal User",
    email: "user@example.com",
    password: "",
  });

  const handleRate = (storeId) => {
    navigate(`/user/stores/${storeId}`);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, User</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Section */}
        <div className="col-span-1 bg-white shadow rounded p-4 h-fit">
          <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-3">
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Email"
            />
            <input
              type="password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              placeholder="New Password"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Update Info
            </button>
          </form>
        </div>

        {/* Store List */}
        <div className="col-span-1 md:col-span-3">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full border px-4 py-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores
              .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
              .map((store) => (
                <div
                  key={store.id}
                  className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={store.img}
                    alt={store.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{store.name}</h3>
                    <p className="text-yellow-500 font-medium mb-2">
                      {store.rating} ⭐
                    </p>
                    <button
                      onClick={() => handleRate(store.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                    >
                      View & Rate
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;