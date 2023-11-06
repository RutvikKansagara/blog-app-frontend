import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../../utils/authUtils";
import { getAllBlogs } from "../../features/blog/BlogAction";
import BlogList from "../../components/blog/BlogList";

const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");

const AllBLogs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate]);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    blogsuccess,
    blogupdatesuccess,
    blogDetailsById,
    blogUser,
    blogImageUrl,
    allBlogs,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    if (userToken) {
      dispatch(getAllBlogs());
    }
  }, [dispatch]);

  return (
    <>
      {loading && <Loader text="Loading..." />}
      {!loading && allBlogs && allBlogs.length > 0 ?(
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                All Blogs
              </h2>
              <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                this is all blogs for you. you can read it and gain knowledge.
              </p>
            </div>
            <BlogList blogs={allBlogs} isYourBlogsPage={false} />
          </div>
        </section>
        ): (
          <div className="text-center mt-8">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No blogs found.
            </p>
          </div>
      
      )}
    </>
  );
};

export default AllBLogs;
