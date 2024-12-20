import React, { useEffect, useState } from "react";
import Layout from "./layout";
import {
  Check,
  Done,
  ErrorOutlineOutlined,
  FiberManualRecord,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

export default function finishUp() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  // Password Errors state
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
  });

  // Check password Errors

  useEffect(() => {
    const errors = {
      length: password.length < 8,
      number: !/\d/.test(password),
      letterCase: !/[a-z]/.test(password) || !/[A-Z]/.test(password),
      symbol: !/[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordErrors(errors);
  }, [password]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(passwordErrors).includes(true)) {
      setError("Please ensure your password meets all criteria.");
      return;
    }

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
      localStorage.setItem("username", fullname);
      // Redirect to a different page, e.g., dashboard
      router.push("/dashboard");
    } else {
      setError(data.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen relative ">
        <div className="w-full my-20 md:my-10 bg-white md:bg-gray-50  md:w-[510px] lg:w-[576px] p-6 md:p-10 rounded-sm lg:shadow-lg lg:bg-white text-center transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="font-bold text-[22px] md:text-[26px]">
              Welcome to Homnique
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-600">
              A platform dedicated to simplifying care management
            </p>
          </div>

          {/* Form Section */}
          <div className="flex flex-col items-center">
            <form className="w-full" onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block text-left mb-1 text-gray-700 text-sm">
                Enter Full Name
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                maxLength={320}
                placeholder="Jasmine Daramola"
                className="mb-4 p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                required
              />

              <label className="block text-left mb-1 text-gray-700 text-sm">
                Company email
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

              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm text-left text-gray-700 mb-2"
                >
                  Select Role
                </label>
                <div className="relative">
                  <div className="block w-full p-2 pr-10 rounded-md border opacity-45 border-gray-300 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                    <option
                      value="key-worker"
                      className="text-left"
                      disabled
                      selected
                    >
                      Key Worker
                    </option>
                  </div>
                  {/* Custom Arrow */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <label className="block text-left mb-1 text-gray-700 text-sm">
                Password
              </label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
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
              {error && (
                <p className="text-red-500 text-sm mt-[-10px] float-start ">
                  <ErrorOutlineOutlined /> {error}
                </p>
              )}
              {/* {Password strength indicator} */}
              <div className="flex gap-4 mb-6 float-start">
                <section className="flex flex-col gap-2 ">
                  <li className="list-none text-[#6e6e6e] text-left text-[12px]">
                    {!passwordErrors.length ? (
                      <Done className="text-[0.8rem] text-blue-500 font-extrabold" />
                    ) : (
                      <>
                        <FiberManualRecord className="text-[0.8rem]" />
                      </>
                    )}
                    Use 8 or more characters
                  </li>
                  <li className="list-none text-[#6e6e6e] text-left text-[12px]">
                    {!passwordErrors.number ? (
                      <Done className="text-[0.8rem] text-blue-500 font-extrabold" />
                    ) : (
                      <>
                        <FiberManualRecord className="text-[0.8rem]" />
                      </>
                    )}
                    Use a number (e.g. 1234)
                  </li>
                </section>
                <section className="flex flex-col gap-2">
                  <li className="list-none text-[#6e6e6e] text-left text-[12px]">
                    {!passwordErrors.letterCase ? (
                      <Done className="text-[0.8rem] text-blue-500 font-extrabold" />
                    ) : (
                      <>
                        <FiberManualRecord className="text-[0.8rem]" />
                      </>
                    )}
                    Use upper and lowercase letters
                  </li>
                  <li className="list-none text-[#6e6e6e] text-left text-[12px]">
                    {!passwordErrors.symbol ? (
                      <Done className="text-[0.8rem] text-blue-500 font-extrabold" />
                    ) : (
                      <>
                        <FiberManualRecord className="text-[0.8rem]" />
                      </>
                    )}
                    Use a symbol (e.g. !@#$)
                  </li>
                </section>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between w-full mb-6">
                {/* Remember Me Section */}
                
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-4 border-blue-600 outline-blue-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm font-medium text-gray-700"
                    >
                      By creating an account , you agree to our{" "}
                      <a href="/" className="text-blue-500">
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="/" className="text-blue-500">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  "Complete Registration"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
