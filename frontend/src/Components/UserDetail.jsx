import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";

const UserDetail = () => {
  const { allUsers } = useUser();
  const { id } = useParams();
  const [rating, setRating] = useState(null);
  const user = allUsers.find((u) => u.id === parseInt(id));
  console.log(user);
  
  useEffect(() => {
    
    const fetchStoreRating = async () => {
      try {
        console.log('exec');
        
        const response = await axios.get("http://localhost:3000/store/getstorerating", {
          params: { user_id: user.id },
        });
        setRating(response.data.average_rating);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching store rating:", error);
        setRating(0);
      }
    };

    if (user && user.role === "owner") {
      fetchStoreRating();
    }
  }, [user]);

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
      {user.role === "owner" && (
        <p><strong>Store Rating:</strong> {rating !== null ? rating : "Loading..."}</p>
      )}
    </div>
  );
};

export default UserDetail;
