import axios from 'axios';

//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/auth`;

const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser, getUserProfile };