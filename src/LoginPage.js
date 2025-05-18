import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
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
    <div className="min-h-screen bg-white">
      <div className="h-20 bg-white"></div>

      <div className="bg-blue-800 min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white"
          />

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white text-sm"
            >
              {showPassword ? "🙈" : "👁️"} {/* Swap with Heroicons if you prefer */}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="w-24 bg-white text-blue-800 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
