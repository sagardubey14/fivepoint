import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "sagar",
    role: "admin",
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = (
    <>
      <div className="text-white font-medium hover:text-gray-200 cursor-pointer">
        About
      </div>
      {!user ? (
        <>
          <div
            className="text-white font-medium hover:text-gray-200 cursor-pointer"
            onClick={() =>
              setUser({
                name: "sagar",
                role: "admin",
              })
            }
          >
            Login
          </div>
          <div className="text-white font-medium hover:text-gray-200 cursor-pointer">
            Signup
          </div>
        </>
      ) : (
        <>
          <div className="text-white font-medium hover:text-gray-200 cursor-pointer">
            Profile
          </div>
          <div
            className="text-white font-medium hover:text-gray-200 cursor-pointer"
            onClick={() => setUser(null)}
          >
            Logout
          </div>
          {["admin", "store"].includes(user.role) && (
            <div className="text-white font-medium hover:text-gray-200 cursor-pointer">
              Dashboard
            </div>
          )}
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">Five-Point</div>
        <div className="hidden md:flex space-x-6">
          {navLinks}
        </div>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
