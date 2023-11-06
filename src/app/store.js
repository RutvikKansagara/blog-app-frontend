// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import userReducer from "../features/user/UserSlice";
import blogReducer from "../features/blog/BlogSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    blog:blogReducer
  },
});
export default store;
