import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthToggle = () => {
  const location = useLocation();

  const initialFormType = location.state?.formType || 'login';
  const [formType, setFormType] = useState(initialFormType);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (location.state?.formType) {
      setFormType(location.state.formType);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setSignupData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === 'login') {
      console.log('Login Data:', loginData);
      setLoginData({ email: '', password: '' });
    } else {
      console.log('Signup Data:', signupData);
      setSignupData({ fullName: '', email: '', password: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className="rounded-lg shadow-lg w-full max-w-md p-8"
        style={{ backgroundColor: 'rgb(153, 212, 226)' }}
      >
        {/* Logo + Heading */}
        <div className="flex items-center justify-center mb-8 space-x-2">
          <span className="text-3xl">⭐</span>
          <h2 className="text-3xl font-bold text-indigo-700">FivePoint</h2>
        </div>

        {/* Toggle buttons */}
        <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 font-semibold transition-colors ${
              formType === 'login'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFormType('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-semibold transition-colors ${
              formType === 'signup'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setFormType('signup')}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {formType === 'signup' && (
            <input
              type="text"
              name="fullName"
              value={signupData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={formType === 'login' ? loginData.email : signupData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formType === 'login' ? loginData.password : signupData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            {formType === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthToggle;