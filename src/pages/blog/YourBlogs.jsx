import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { userBlogs } from "../../features/blog/BlogAction";
import BlogList from "../../components/blog/BlogList";
import { isAuthenticated } from "../../utils/authUtils";

const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");

const YourBlogs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate]);
  const dispatch = useDispatch();
  const { loading, error, success, userAllBlogs } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if(userToken){
    dispatch(userBlogs());
    }
  }, [dispatch]);

  return (
    <>
      {loading && <Loader text="Loading ..." />}
      {!loading && userBlogs && (
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
            <BlogList blogs={userAllBlogs} isYourBlogsPage={true} />
          </div>
        </section>
      )}
    </>
  );
};

export default YourBlogs;
