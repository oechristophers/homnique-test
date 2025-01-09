import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function ReAuth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Auth code
  const [authCode, setAuthCode] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false); // To manage resend button visibility
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (countdown === 0) {
      setCanResend(true); // Enable the resend button when countdown reaches 0
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    axios
      .post(process.env.NEXT_PUBLIC_FORGOTPASS_URL, {
        email: email,
      })
      .then((response) => {
        if (response.data.success) {
          // Save token to localStorage
          setMessage(response.data.message);
          localStorage.setItem("emailForResend", email);

          // Show success toast
          toast({
            title: "Success",
            description: "A 6 digit token has been sent to your email address.",
            variant: "success",
          });
          setStep(2);
        } else {
          setError(true);
          setMessage(response.data.message || "This email address is not registered.");
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message || "An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Reset loading state after request is completed
      });
  };

  // Handle change in auth code input
  const handleAuthCodeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      const updatedAuthCode = [...authCode];
      updatedAuthCode[index] = value;
      setAuthCode(updatedAuthCode);
    }
  };

  // Handle Resend Code action
  const handleResend = async () => {
    const emailForResend = localStorage.getItem("emailForResend");

    if (!emailForResend) {
      setMessage("No email found. Please enter your email again.");
      setError(true);
      return;
    }

    axios
      .post(process.env.NEXT_PUBLIC_FORGOTPASS_URL, {
        email: emailForResend,
      })
      .then((response) => {
        if (response.data.success) {
          // Save token to localStorage
          setMessage(response.data.message);
          setCountdown(30);
          setCanResend(false);
          setMessage(" ");
          setAuthCode(["", "", "", ""]);

          toast({
            title: "Token resend Success",
            description: "",
            variant: "success",
          });
        } else {
          setError(true);
          setMessage(response.data.message || "Error sending OTP. Please try again.");
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(
          err?.message || "An unexpected error occurred. Please try again."
        );
      })
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);
  
    const otp = authCode.join("");
  
    axios
      .post(process.env.NEXT_PUBLIC_VERIFYOTP_URL, {
        email: email,
        otp: otp, // Assuming the OTP should be sent as part of the payload
      })
      .then((response) => {
        if (response.data.success) {
          // Save token to localStorage
          setMessage("");
          setStep(3);
          toast({
            title: "Token verified",
            variant: "success",
          });
        } else {
          setError(true);
          setMessage(response.data.message || "Invalid code. Please try again.");
          setCountdown(30);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message || "An error occurred during OTP verification.");
      })
      .finally(() => {
        setLoading(false); // Reset loading state after request is completed
      });
  };
  

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError(true);
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    axios
    .post(process.env.NEXT_PUBLIC_RESETPASS_URL, {
      otp: authCode.join(""),
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    }).then((response) => {
      if (response.data.success) {
        setMessage("Your password has been successfully changed.");
        setStep(4);
      } else {
        setError(true);
        setMessage(
          response.data.message || "Error changing password. Please try again."
        );
      }
    }).catch((err) => {
      setError(true);
      setMessage(
        err?.message || "An unexpected error occurred. Please try again."
      );
    })

  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="w-full bg-white md:bg-gray-50 sm:w-[450px] md:w-[510px] lg:w-[576px] p-6 md:p-10 rounded-sm lg:shadow-lg lg:bg-white text-center transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div className="flex flex-col gap-2 mb-6 justify-center">
            {step === 4 && (
              <div className="flex w-full justify-center">
                <section className="relative  w-[100px] h-[100px] flex transition-all duration-300 ease-in-out">
                  {/* Centered Black Background */}

                  {/* Logo Image */}
                  <Image
                    src="/success.png"
                    alt="logo"
                    width={100}
                    height={200}
                    layout="responsive"
                    objectFit="contain"
                    className="max-h-full max-w-full rounded-full border-2 border-white z-10 transition-all duration-300 ease-in-out"
                  />
                </section>
              </div>
            )}
            <h2
              className={`font-bold   ${
                step === 4
                  ? "text-[52px] mt-[-20px]"
                  : "text-[22px] md:text-[26px]"
              }`}
            >
              {step === 1
                ? "Forgot Password?"
                : step === 2
                ? "Enter Verification Code"
                : step === "3"
                ? "Reset Password"
                : "Successful"}
            </h2>
            <p className="text-[16px] md:text-[18px] px-8 text-gray-600">
              {step === 1
                ? "Don’t worry! Enter your email to reset your password and gain access."
                : step === 2
                ? "Please enter the 4-digit verification code sent to your email."
                : step === 4
                ? "Your password has been reset successfully."
                : "Set a new password to secure your account."}
            </p>
          </div>

          {/* Form Section */}
          {step === 1 && (
            <div
              className={`flex flex-col items-center transition-all duration-500 ease-in-out ${
                step === 2 ? "transform translate-x-full opacity-0" : ""
              }`}
            >
              <form onSubmit={handleSubmit} className="w-full">
                {/* Email Input */}
                <label className="block text-left mb-1 text-gray-700 text-sm">
                  Enter your work email
                </label>
                <input
                  type="email"
                  maxLength={320}
                  placeholder="Name@homnique.com"
                  className="mb-8 p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* Display message or error */}
                {message && (
                  <p
                    className={`text-sm ${
                      error ? "text-red-500" : "text-green-500"
                    } mt-2`}
                  >
                    {message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="#ffffff" size={20} />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Auth Code Section */}
          {step === 2 && (
            <div className="flex flex-col w-full  justify-center items-center  transition-all duration-500 ease-in-out">
              <form className="w-full" onSubmit={handleVerifyCode}>
                <div className="flex justify-center gap-2 mb-4">
                  {authCode.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleAuthCodeChange(e, index)}
                      className="w-12 h-12 p-3 text-center rounded-md border border-gray-300"
                    />
                  ))}
                </div>

                {error ? (
                  <p
                    className={`text-sm ${
                      error ? "text-red-500" : "text-green-500"
                    }  mt-[-10px] mb-5`}
                  >
                    {message}
                  </p>
                ) : (
                  <div
                    className={`text-sm ${
                      countdown > 0 ? "text-red-500" : "text-gray-600"
                    } mb-4`}
                  >
                    {countdown > 0
                      ? ` 00:${countdown}`
                      : "Code expired. Please request a new one."}
                  </div>
                )}

                {countdown === 0 && (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out mb-4"
                    disabled={canResend === false}
                  >
                    Resend Code
                  </button>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                  disabled={countdown === 0} // Disable if code expired
                >
                  Verify Code
                </button>
                <p className="mt-5">
                  If you didn&apos;t receive a code!{" "}
                  <span onClick={handleResend} className="text-red-500">
                    Resend
                  </span>{" "}
                </p>
              </form>
            </div>
          )}
          {/* Change Password Form */}
          {step === 3 && (
            <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
              <form onSubmit={handleChangePassword} className="w-full">
                {/* New Password Input */}
                <label className=" text-left mb-1 text-gray-700 text-sm flex">
                  New Password
                </label>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <p
                  className={`text-sm text-[#00000084] mt-[-10px] float-start mb-5 `}
                >
                  use 8 or more characters, with a mix of letters, numbers and
                  symbols
                </p>
                <br />
                {/* Confirm Password Input */}
                <label className=" mb-1 text-gray-700 text-sm w-full text-left flex ">
                  Confirm Password
                </label>

                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="p-3 h-12 rounded-md border w-full text-black focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  >
                    {showPassword ? (
                      <VisibilityOutlined
                        className="text-sm text-[#00000048]"
                        fontSize="3px"
                      />
                    ) : (
                      <VisibilityOffOutlined
                        className="text-sm text-[#00000048]"
                        fontSize="3px"
                      />
                    )}
                  </span>
                </div>

                {/* Display message or error */}
                {message && (
                  <p
                    className={`text-sm ${
                      error ? "text-red-500" : "text-green-500"
                    } float-start mt-[-10px] mb-5`}
                  >
                    {message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="#ffffff" size={20} />
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div
              className={`flex flex-col items-center transition-all duration-500 ease-in-out ${
                step === 2 ? "transform translate-x-full opacity-0" : ""
              }`}
            >
              {/* Submit Button */}
              <Link
                href="/auth/login"
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
                onClick={() => setLoading(true)}
              >
                {loading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  "Go to Login"
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
