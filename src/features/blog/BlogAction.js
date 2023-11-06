import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://blog-app-steel-pi.vercel.app/api/blogs";

const makeRequest = async (url, method, data, config) => {
  try {
    const response = await axios({ url, method, data, ...config });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const postBlog = createAsyncThunk(
    "create/blog",
    async (blogData, { getState,rejectWithValue }) => {
      try {
        const state = getState();
      const token = state.auth.userToken;
      const userId = state.auth.userId;

      const config = {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      };
       console.log("blog data:",blogData);
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("content", blogData.content);
        formData.append("user",userId);
       
     formData.append("blogImage", blogData.blogImage);
        
           
        const data = await makeRequest(`${BASE_URL}/blog/create/${userId}`, 'post', formData,config);
        return data
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

  export const updateBlogDetails = createAsyncThunk(
    'update/blog',
    async (updatedData, { getState, rejectWithValue }) => {
        console.log(updatedData);
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
        formData.append("title", updatedData.title);
        formData.append("content", updatedData.content);
        
        if (updatedData.blogImage) {
          formData.append("blogImage", updatedData.blogImage);
        }
  
        const data = await makeRequest(`${BASE_URL}/blog/edit/${updatedData.blogId}/${userId}`, 'put', formData, config);
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


  export const getBlogDetails = createAsyncThunk(
    'get/blog-details',
    async (blogId, { getState, rejectWithValue }) => {
      
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
  
        const { data } = await axios.get(`${BASE_URL}/blogs/${blogId}/${userId}`, config);
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

  export const getAllBlogs = createAsyncThunk(
    'get/all-blogs',
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
  
        const { data } = await axios.get(`${BASE_URL}/all-blogs/${userId}`, config);
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

  export const userBlogs = createAsyncThunk(
    'get/user-blogs',
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
  
        const { data } = await axios.get(`${BASE_URL}/user-blogs/${userId}`, config);
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
  
  export const deleteBlogById = createAsyncThunk(
    "delete/blog",
    async (blogId, { getState,rejectWithValue }) => {
      try {
        const state = getState();
      const token = state.auth.userToken;
      const userId = state.auth.userId;

      const config = {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      };
       
        
           
        const data = await makeRequest(`${BASE_URL}/blog/delete/${blogId}/${userId}`, 'delete', null,config);
        return data
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

  export const searchBlogs = createAsyncThunk(
    "search/blogs",
    async (query, { getState,rejectWithValue }) => {
      try {
        const state = getState();
      const token = state.auth.userToken;
      const userId = state.auth.userId;
      const config = {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      };
       
        
           
        const data = await makeRequest(`${BASE_URL}/${userId}/search?query=${query}`, 'get', null,config);
        return data
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

  