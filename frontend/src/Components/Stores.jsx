import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

const Stores = () => {
  const { allUsers, user, setUser, stores, setStores } = useUser();

  const [filter, setFilter] = useState({ name: "", address: "" });
  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    owner_id: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formError, setFormError] = useState("");

  const filteredStores =
    stores?.filter(
      (store) =>
        store.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        store.address.toLowerCase().includes(filter.address.toLowerCase())
    ) || [];

  const handleAddStore = async (e) => {
    e.preventDefault();
    setFormError(""); // reset before submission

    if (!newStore.name || !newStore.address || !newStore.owner_id) {
      setFormError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/admin/addstore", newStore, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      const storeWithId = { ...newStore, id: res.data.storeId };
      setStores([...(stores || []), storeWithId]);
      setNewStore({ name: "", address: "", owner_id: "" });
      setIsFormVisible(false);
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.error || "Error adding store");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow mt-6 relative min-h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Store Management</h3>
      <button
        onClick={() => setIsFormVisible(true)}
        className="absolute top-4 right-6 w-12 h-12 rounded-full bg-green-600 text-white text-3xl font-bold hover:bg-green-700 flex items-center justify-center"
        aria-label="Add Store"
        title="Add Store"
      >
        +
      </button>

      {isFormVisible && (
        <div
          onClick={() => setIsFormVisible(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleAddStore}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md grid grid-cols-1 gap-4"
          >
            <h4 className="text-lg font-semibold mb-4">Add New Store</h4>
            <input
              type="text"
              placeholder="Store Name"
              className="border px-3 py-2 rounded"
              value={newStore.name}
              onChange={(e) =>
                setNewStore({ ...newStore, name: e.target.value })
              }
              required
              autoFocus
            />
            <input
              type="text"
              placeholder="Address"
              className="border px-3 py-2 rounded"
              value={newStore.address}
              onChange={(e) =>
                setNewStore({ ...newStore, address: e.target.value })
              }
              required
            />
            <select
              className="border px-3 py-2 rounded"
              value={newStore.owner_id}
              onChange={(e) =>
                setNewStore({ ...newStore, owner_id: e.target.value })
              }
              required
            >
              <option value="">Select Owner</option>
              {allUsers
                .filter((u) => u.role === "owner")
                .map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
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
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add Store
              </button>
            </div>
            {formError && (
              <div className="text-red-600 mt-2 text-sm">{formError}</div>
            )}
          </form>
        </div>
      )}

      {Array.isArray(stores) && stores.length > 0 && (
        <>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Filter by Store Name"
              className="border px-3 py-2 rounded w-1/2"
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Filter by Address"
              className="border px-3 py-2 rounded w-1/2"
              value={filter.address}
              onChange={(e) =>
                setFilter({ ...filter, address: e.target.value })
              }
            />
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Store Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => {
                  const owner = allUsers.find(
                    (u) => u.id === Number(store.owner_id)
                  );
                  return (
                    <tr key={store.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {store.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {store.address}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {owner ? owner.name : "Unknown"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No stores found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Stores;
