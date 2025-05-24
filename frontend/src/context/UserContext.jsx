import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/tokendata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, allUsers, setAllUsers, stores, setStores }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
