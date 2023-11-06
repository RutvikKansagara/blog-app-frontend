
import { createSlice } from '@reduxjs/toolkit'
import { registerUser,userLogin} from './AuthAction';


// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null
  const userId = localStorage.getItem('userId')
  ? localStorage.getItem('userId')
  : null
 
const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  userId,
  error: null,
  success: false,
  loginSuccess:false,
  
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      // login user
    builder
    .addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(userLogin.fulfilled, (state, { payload }) => {
      console.log("payload:",payload);
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token; // login successful
      state.userId = payload.user._id;
      state.loginSuccess = true;
    })
    .addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    
  },
})
export default authSlice.reducer 