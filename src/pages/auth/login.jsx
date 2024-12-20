import React, { useState } from "react";
import Layout from "./layout";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/dummy-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.authenticated) {
      alert("Login successful!");
      // Redirect to a different page, e.g., dashboard
      router.push('/dashboard')

    } else {
      setError(data.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="w-full bg-white md:bg-gray-50 sm:w-[450px] md:w-[510px] lg:w-[576px] p-6 md:p-10 rounded-sm lg:shadow-lg lg:bg-white text-center transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="font-bold text-[22px] md:text-[26px]">Login</h2>
            <p className="text-[16px] md:text-[18px] text-gray-600">
              Login now and access your account
            </p>
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center">
            <form className="w-full" onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block text-left mb-1 text-gray-700 text-sm">
                Enter your work email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                placeholder="Name@homnique.com"
                className="mb-4 p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Password Input */}
              <label className="block text-left mb-1 text-gray-700 text-sm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={320}
                placeholder="Enter password"
                className={`mb-4 p-3 h-12 rounded-md border w-full text-black ${
                  error ? "border-red-500" : ""
                } focus:ring-2 focus:ring-blue-500`}
                required
              />

              {/* Error Message */}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between w-full mb-6">
                {/* Remember Me Section */}
                {error ? (
                  <p className="text-red-500 text-sm mt-[-10px] float-start">
                    <ErrorOutlineOutlined /> {error}
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-gray-700"
                    >
                      Remember Me
                    </label>
                  </div>
                )}

                {/* Forgot Password Section */}
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                disabled={loading}
              >
               {loading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
