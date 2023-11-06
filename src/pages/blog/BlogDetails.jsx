import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetails } from "../../features/blog/BlogAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import parse from "html-react-parser";
import { isAuthenticated } from "../../utils/authUtils";

const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");

const BlogDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate, userToken]);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    blogsuccess,
    blogDetailsById,
    blogUser,
    blogImageUrl,
  } = useSelector((state) => state.blog);

  const { blogId } = useParams();

  useEffect(() => {
    if (userToken) {
      dispatch(getBlogDetails(blogId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (blogsuccess && blogDetailsById) {
      console.log(blogDetailsById);
      console.log(blogDetailsById.user);
      console.log(blogImageUrl);
    }
  }, [blogsuccess, blogDetailsById]);
  return (
    <>
      {loading && <Loader text="Loading..." />}
      {!loading && blogsuccess && blogDetailsById && (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-md px-4 md:px-8">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
              {blogDetailsById.title}
            </h1>
            <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
              {blogImageUrl && (
                <img
                  src={blogImageUrl}
                  loading="lazy"
                  alt={`${blogDetailsById.username}`}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
            <div className="flex items-center justify-between mt-2 md:flex-row flex-col space-y-5">
              <div className="flex items-center">
                {blogDetailsById.user.pic && (
                  <img
                    src={`https://blog-app-steel-pi.vercel.app/${blogDetailsById.user.pic}`}
                    loading="lazy"
                    alt={blogDetailsById.user.username}
                    className="h-8 w-8 object-cover rounded-full"
                  />
                )}
                <p className="text-gray-500 ml-2 font-bold text-2xl">
                  {blogDetailsById.user.username}
                </p>
              </div>
              <p className="text-gray-500 justify-end">
                {new Date(blogDetailsById.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-6 text-gray-500 sm:text-lg md:mb-8 mt-5">
              {blogDetailsById.content &&
              typeof blogDetailsById.content === "string"
                ? parse(blogDetailsById.content)
                : "Content not available"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetails;
