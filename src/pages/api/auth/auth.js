import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/signIn`, { username, password });
    console.log('Response:', response.data); // Log response data
    return response.data;
  } catch (error) {
    console.error('API Error:', error); // Log any error
    throw error.response?.data || { message: 'Unexpected error occurred' };
  }
};


export const forgetPassword = async (email) => {
  return axios.post(`${BASE_URL}/auth/user/forgetPassword`, { email });
};

export const verifyOtp = async (email, otp) => {
  return axios.post(`${BASE_URL}/auth/user/verifyOtp`, { email, otp });
};

export const resetPassword = async (otp, newPassword, confirmPassword) => {
  return axios.post(`${BASE_URL}/auth/user/resetPassword`, {
    otp,
    newPassword,
    confirmPassword,
  });
};
