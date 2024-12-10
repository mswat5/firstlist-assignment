import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard/spoofchecker");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg bg-white">
        {/* Left side - Form Section */}
        <div className="w-1/2 p-8">
          <div className="mb-6">
            {/* <img src={Logo} alt="FirstList" className="w-25 h-12 mb-4" /> */}

            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-gray-500">
              Please login to continue with your account
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="jonas.kahnwald@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-700">
                Remember Me
              </label>
            </div> */}

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-purple-400 text-white py-2 rounded-md hover:bg-blue-400 transition"
              onClick={handleLogin}
            >
              Login
            </button>

            {/* Sign in option */}
            <p className="text-center text-gray-500 mt-4">
              Need an account?{" "}
              <Link to="/Signup" className="text-blue-600">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
