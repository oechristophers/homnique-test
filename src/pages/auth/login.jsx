import React, { useEffect, useState } from "react";
import Layout from "./layout";
import {
  ErrorOutlineOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError(""); // Clear previous error messages
  
    axios.post(process.env.NEXT_PUBLIC_LOGIN_URL, {
      username: email,
      password: password,
    })
      .then((response) => {
        if (response.data.success) {
          // Save token to localStorage
          setMessage(response.data.message);
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("userName", response.data.username);
          localStorage.setItem("userRole", response.data.role);
  
          // Show success toast
          toast({
            title: "Login successful",
            description: `Welcome back, ${response.data.username}`, // Correct username interpolation
            variant: "success", // Changed to "success" for successful login
          });
  
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          setError(response.data.message || 'Sign-in failed');
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'An error occurred');
      })
      .finally(() => {
        setLoading(false); // Reset loading state after request is completed
      });
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
                type="text"
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
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? (
                    <VisibilityOutlined
                      className="text-sm  text-[#00000048]"
                      fontSize="3px"
                    />
                  ) : (
                    <VisibilityOffOutlined
                      className="text-sm  text-[#00000048]"
                      fontSize="3px"
                    />
                  )}
                </span>
              </div>

              {/* Error Message */}

              {/* Remember Me & Forgot Password */}
              <div className={`flex  items-center justify-between w-full mb-6`}>
                {/* Remember Me Section */}
                {error ? (
                  <p className="text-red-500 text-sm mt-[-10px] max-w-[37ch]  float-start">
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
                {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
