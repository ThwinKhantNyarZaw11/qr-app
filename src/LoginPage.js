import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://qr-app-production-9df5.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();

      if (result.success) {
        alert("Login successful!");
        navigate("/admin");
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Failed to connect to server. Is the backend running?");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-center mb-4">
            <img
              src="assets/kbzlogo.png"
              alt="KBZ Logo"
              className="h-12 rounded"
            />
          </div>

          <h3 className="text-2xl font-bold text-center mb-3">Sign In</h3>
          
          <div className="flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400 text-sm">or login with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
          </div>


          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Log In
            </button>

            <div className="text-center text-sm mt-4">
              {/* Add a link if needed */}
              {/* <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
