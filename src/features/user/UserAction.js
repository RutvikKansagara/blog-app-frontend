import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://blog-app-steel-pi.vercel.app/api/users";

const makeRequest = async (url, method, data, config) => {
  try {
    const response = await axios({ url, method, data, ...config });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};





export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (_, { getState, rejectWithValue }) => {
    
    try {
      const state = getState();
      const token = state.auth.userToken;
      const userId = state.auth.userId;
      // console.log("state from user action:",state);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${BASE_URL}/user-details/${userId}`, config);
      // console.log("data from user actions:",data);
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async (updatedData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.userToken;
      const userId = state.auth.userId;
      const config = {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("username", updatedData.username);
      formData.append("email", updatedData.email);
      
      if (updatedData.profilePic) {
        formData.append("pic", updatedData.profilePic);
      }

      const data = await makeRequest(`${BASE_URL}/update-user-details/${userId}`, 'put', formData, config);
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
export const logout = createAsyncThunk(
  'user/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.userToken;
      const userId = state.auth.userId;
      const config = {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      };
   
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      

      const data = await makeRequest(`${BASE_URL}/logout`, 'post', null, config);
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