// authSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails,updateUserDetails,logout} from './UserAction';


// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null
const initialState = {
  loading: false,
  userDetails:null,
  updatedUserInfo: null,
  userToken,
  error: null,
  success: false,
  updateSuccess:false,
  logoutSuccess:false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get user details
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userDetails = payload;
        state.userImageUrl = payload.userImageUrl;
        state.success = true; 
        console.log(payload)
      })
      .addCase(getUserDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      // updated user details
    builder
    .addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.updatedUserInfo = payload;
      state.updateSuccess = true;
    })
    .addCase(updateUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder
    .addCase(logout.pending, (state) => {
      
      state.error = null;
    })
    .addCase(logout.fulfilled, (state, { payload }) => {
      
      
      state.logoutSuccess = true;
    })
    .addCase(logout.rejected, (state, { payload }) => {
      
      state.error = payload;
    });
  },
})
export default userSlice.reducer  