import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://127.0.0.1:5000/api/users";

const makeRequest = async (url, method, data, config) => {
  try {
    const response = await axios({ url, method, data, ...config });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("username", registerData.username);
      formData.append("email", registerData.email);
      formData.append("password", registerData.password);
      formData.append("confirmpassword", registerData.confirmpassword);
      if (registerData.pic) {
        formData.append("pic", registerData.pic);
      }
         
      await makeRequest(`${BASE_URL}/register`, 'post', formData);
    } catch (error) {
      console.log(error);

      if (error.errors) {
        return rejectWithValue(error.errors);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = await makeRequest(`${BASE_URL}/login`, 'post', { email, password }, config);

      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userId', data.user._id);
      return data;
    } catch (error) {
      if (error.errors) {
        return rejectWithValue(error.errors);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);




