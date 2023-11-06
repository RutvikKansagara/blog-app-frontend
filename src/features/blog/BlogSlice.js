import { createSlice } from "@reduxjs/toolkit";
import { postBlog,updateBlogDetails,getBlogDetails,getAllBlogs,userBlogs,deleteBlogById,BlogDetailsById,searchBlogs } from "./BlogAction";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  
  userToken,
  error: null,
  success: false,
  
  blogDetailsById:{},
  blogUser:{},
  blogImageUrl:null,
  blogsuccess:false,

  blogupdatesuccess:false,
  
  allBlogs:[],
  userAllBlogs:[],

  searchresults:[]
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(postBlog.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(updateBlogDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogupdatesuccess = true; 
      })
      .addCase(updateBlogDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      builder
      .addCase(getBlogDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogDetails.fulfilled, (state, { payload }) => {
        state.blogDetailsById = payload.blog;
        state.blogImageUrl = payload.blogImageUrl;
        state.user = payload.user;
        state.loading = false;
        state.blogsuccess = true; 
      })
      .addCase(getBlogDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, { payload }) => {
        console.log("all blogs:",payload);
        state.allBlogs = payload.blogs;
        state.loading = false;
        state.success = true; 
      })
      .addCase(getAllBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(userBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userBlogs.fulfilled, (state, { payload }) => {
        state.userAllBlogs = payload.blogs;
        state.loading = false;
        state.success = true; 
      })
      .addCase(userBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

      builder
      .addCase(deleteBlogById.pending, (state) => {
        
        state.error = null;
      })
      .addCase(deleteBlogById.fulfilled, (state, { payload }) => {
        
        state.success = true; 
      })
      .addCase(deleteBlogById.rejected, (state, { payload }) => {
        
        state.error = payload;
      });


      builder
      .addCase(searchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlogs.fulfilled, (state, { payload }) => {
        state.searchresults = payload.searchResults;
        console.log(payload);
        state.success = true; 
        state.loading = false;
        
      })
      .addCase(searchBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default blogSlice.reducer;
