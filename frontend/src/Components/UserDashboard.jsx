import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import updatePassword from "./updatePass";

const imageUrls = [
  "https://picsum.photos/id/1011/400/300",
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1021/400/300",
  "https://picsum.photos/id/1035/400/300",
  "https://picsum.photos/id/1041/400/300",
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, stores, setStores } = useUser();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "http://localhost:3000/users/getstores",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const dataWithImages = response.data.map((store, index) => ({
          ...store,
          img: imageUrls[index % imageUrls.length],
        }));

        setStores(dataWithImages);
      } catch (err) {
        setError("Failed to load stores. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleRate = (storeId) => {
    navigate(`/user/stores/${storeId}`);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updatePassword({user_id:user.id, ...userInfo});
      setSuccessMessage("Profile updated successfully!");
      setUserInfo({...userInfo, password:''})
    } catch (err) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, User</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 bg-white shadow rounded p-4 h-fit">
          <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-3">
            <input
              type="text"
              value={userInfo.name}
              className="w-full border px-4 py-2 rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={userInfo.email}
              className="w-full border px-4 py-2 rounded"
              placeholder="Email"
            />
            <input
              type="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="New Password"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Update Info
            </button>
            {successMessage && (
              <p className="text-green-600 text-sm text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}
          </form>
        </div>

        <div className="col-span-1 md:col-span-3">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full border px-4 py-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
            />
          </div>

          {loading ? (
            <div className="text-center py-10">Loading stores...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : stores.length === 0 ? (
            <div className="text-center text-gray-600 py-10">
              No stores found. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores
                .filter((s) =>
                  s.name.toLowerCase().includes(search.toLowerCase())
                )
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
                      <h3 className="text-lg font-semibold mb-1">
                        {store.name}
                      </h3>
                      <p className="text-yellow-500 font-medium mb-2">
                        {Number(store.average_rating).toFixed(1)} ⭐
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
