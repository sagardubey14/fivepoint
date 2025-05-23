import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useUser();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(!user) return;
  //   if(user.role==='admin'){
  //     navigate('/admin')
  //   }
  // },[user, navigate])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = (
    <>
      <Link
        to="/about"
        className="text-white font-medium hover:text-gray-200 cursor-pointer"
      >
        About
      </Link>

      {!user ? (
        <>
          <Link
            to={''}
            className="text-white font-medium hover:text-gray-200 cursor-pointer"
            onClick={() => {
              setUser({
                name: "sagar",
                role: "admin",
              });
              navigate('/admin')
            }}
          >
            Login
          </Link>

          <Link
            to="/auth"
            className="text-white font-medium hover:text-gray-200 cursor-pointer"
          >
            Signup
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="text-white font-medium hover:text-gray-200 cursor-pointer"
          >
            Profile
          </Link>

          <div
            className="text-white font-medium hover:text-gray-200 cursor-pointer"
            onClick={() => setUser(null)}
          >
            Logout
          </div>

          {["admin", "store"].includes(user.role) && (
            <Link
              to={`/${user.role}`}
              className="text-white font-medium hover:text-gray-200 cursor-pointer"
            >
              Dashboard
            </Link>
          )}
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={'/'} className="text-white text-lg font-semibold">Five-Point</Link>
        <div className="hidden md:flex space-x-6">{navLinks}</div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">{navLinks}</div>
      )}
    </nav>
  );
};

export default Navbar;
