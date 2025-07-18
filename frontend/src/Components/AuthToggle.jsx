import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const AuthToggle = () => {
  const location = useLocation();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role_id === 1) {
      navigate("/admin");
    }
    if (user.role_id === 2){
      navigate("/user");
    }
    if (user.role_id === 3){
      navigate("/owner");
    }
  }, [user, navigate]);

  const initialFormType = location.state?.formType || "login";
  const [formType, setFormType] = useState(initialFormType);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    if (location.state?.formType) {
      setFormType(location.state.formType);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === "login") {
        const res = await axios.post("http://localhost:3000/users/login", loginData);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        setLoginData({ email: "", password: "" });
        setError("");
      } else {
        const { fullName, email, password, address } = signupData;

        // Validations
        if (fullName.length < 20 || fullName.length > 60) {
          setError("Full Name must be between 20 and 60 characters.");
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError("Invalid email format.");
          return;
        }

        if (password.length < 8 || password.length > 16) {
          setError("Password must be 8–16 characters long.");
          return;
        }

        const uppercaseRegex = /[A-Z]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!uppercaseRegex.test(password) || !specialCharRegex.test(password)) {
          setError("Password must include at least one uppercase letter and one special character.");
          return;
        }

        if (address.length > 400) {
          setError("Address cannot exceed 400 characters.");
          return;
        }

        const signupPayload = {
          name: fullName,
          email: email,
          password: password,
          address: address || null,
          role_id: 2,
        };

        const res = await axios.post("http://localhost:3000/users/signup", signupPayload);
        setSignupData({ fullName: "", email: "", password: "", address: "" });
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="rounded-lg shadow-lg w-full max-w-md p-8" style={{ backgroundColor: "rgb(153, 212, 226)" }}>
        <div className="flex items-center justify-center mb-8 space-x-2">
          <span className="text-3xl">⭐</span>
          <h2 className="text-3xl font-bold text-indigo-700">FivePoint</h2>
        </div>

        <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 font-semibold transition-colors ${
              formType === "login" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => {
              setFormType("login");
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-semibold transition-colors ${
              formType === "signup" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => {
              setFormType("signup");
              setError("");
            }}
          >
            Signup
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {formType === "signup" && (
            <>
              <input
                type="text"
                name="fullName"
                value={signupData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="address"
                value={signupData.address}
                onChange={handleChange}
                placeholder="Address (Optional)"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            value={formType === "login" ? loginData.email : signupData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            value={formType === "login" ? loginData.password : signupData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            {formType === "login" ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthToggle;
