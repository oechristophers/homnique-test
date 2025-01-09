import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createUser = async (email, role) => {
  return axios.post(`${BASE_URL}/auth/user/create`, { email, role });
};