import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const StoreDetail = () => {
  const { user, stores } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const storeId = parseInt(id, 10);

  const store = stores.find((s) => s.id === storeId);
  const [rating, setRating] = useState(
    store?.average_rating ? parseFloat(store.average_rating) : 0
  );

  if (!store) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Store not found
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/users/rate",
        {
          store_id: store.id,
          user_id: user.id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`You rated ${store.name} with ${rating} stars!`);
      navigate("/user");
    } catch (error) {
      console.error("Rating submission failed:", error);
      alert("There was an error submitting your rating.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-6 bg-white shadow rounded">
      <button
        onClick={() => navigate("/user")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Stores
      </button>
      <img
        src={store.img}
        alt={store.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Address:</span> {store.address}
      </p>
      <p className="text-yellow-500 font-semibold mb-1">
        {parseFloat(store.average_rating).toFixed(1)} ⭐ (Average Rating)
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Total Ratings:</span>{" "}
        {store.total_ratings}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold" htmlFor="rating">
          Your Rating (1 to 5):
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default StoreDetail;
