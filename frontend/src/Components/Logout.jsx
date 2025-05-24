import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Logout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    navigate("/");
    setUser(null);
  }

  return (
    <>
      {user && (
        <div
          className="fixed top-4 right-10 cursor-pointer z-50"
          onClick={logOut}
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-gray-700 hover:text-red-600" />
        </div>
      )}
    </>
  );
}

export default Logout;
