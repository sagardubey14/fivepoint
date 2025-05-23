import React, { useState } from "react";

const Stores = () => {
  const [stores, setStores] = useState([
    { id: 1, name: "Store A", location: "New York" },
    { id: 2, name: "Store B", location: "San Francisco" },
  ]);

  const [filter, setFilter] = useState({ name: "", location: "" });
  const [newStore, setNewStore] = useState({ name: "", location: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      store.location.toLowerCase().includes(filter.location.toLowerCase())
  );

  const handleAddStore = (e) => {
    e.preventDefault();
    if (!newStore.name || !newStore.location) return alert("Name and Location required");
    const newId = stores.length ? stores[stores.length - 1].id + 1 : 1;
    setStores([...stores, { ...newStore, id: newId }]);
    setNewStore({ name: "", location: "" });
    setIsFormVisible(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow mt-6 relative min-h-[400px]">

      <h3 className="text-xl font-semibold mb-4">Store Management</h3>

      {/* Green round + button top-right */}
      <button
        onClick={() => setIsFormVisible(true)}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-green-600 text-white text-3xl font-bold hover:bg-green-700 flex items-center justify-center"
        aria-label="Add Store"
        title="Add Store"
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
              onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
              required
              autoFocus
            />
            <input
              type="text"
              placeholder="Location"
              className="border px-3 py-2 rounded"
              value={newStore.location}
              onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
              required
            />
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
          </form>
        </div>
      )}

      {/* Filter Inputs */}
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
          placeholder="Filter by Location"
          className="border px-3 py-2 rounded w-1/2"
          value={filter.location}
          onChange={(e) => setFilter({ ...filter, location: e.target.value })}
        />
      </div>

      {/* Stores Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Store Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{store.name}</td>
                <td className="border border-gray-300 px-4 py-2">{store.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-4">
                No stores found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Stores;