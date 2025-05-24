import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Star } from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import updatePassword from "./updatePass";

const OwnerDashboard = () => {
  const { user } = useUser();

  const [password, setPassword] = useState("");
  const [info, setInfo] = useState({
    name: user.name,
    email: user.email,
  });

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updatePassword({user_id:user.id, ...info, password});
      setSuccessMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOwnerStores = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/store/${user.id}`);
        setStores(res.data);
      } catch (err) {
        console.error("Failed to fetch store data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerStores();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <div className="flex items-center border rounded px-3 py-2 mt-1">
              <User size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full outline-none text-gray-800"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded px-3 py-2 mt-1">
              <Mail size={16} className="text-gray-500 mr-2" />
              <input
                type="email"
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className="w-full outline-none text-gray-800"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <div className="flex items-center border rounded px-3 py-2 mt-1">
              <Lock size={16} className="text-gray-500 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-gray-800"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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

      <div className="w-full lg:w-2/3 bg-white/70 backdrop-blur-sm shadow-xl rounded-xl p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Stores</h2>

        {loading ? (
          <p>Loading stores...</p>
        ) : (
          stores.map((store) => (
            <div key={store.id} className="mb-8">
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg shadow-inner mb-3 flex items-center gap-4">
                <Star size={32} className="text-yellow-500" />
                <div>
                  <p className="text-lg text-gray-600">{store.name}</p>
                  <h3 className="text-2xl font-bold text-yellow-500">
                    {store.average_rating} / 5
                  </h3>
                </div>
              </div>

              <h4 className="text-md font-semibold text-gray-700 mb-2">
                Rated by:
              </h4>
              <div className="space-y-2">
                {store.ratedUsers.length > 0 ? (
                  store.ratedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex justify-between items-center border p-3 rounded-lg"
                    >
                      <span className="text-gray-800 font-medium">
                        {user.name}
                      </span>
                      <span className="text-yellow-500 font-bold flex items-center gap-1">
                        {user.rating} <Star size={16} />
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No ratings yet</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
