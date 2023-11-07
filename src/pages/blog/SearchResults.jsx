import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { searchBlogs } from "../../features/blog/BlogAction";
import { isAuthenticated } from "../../utils/authUtils";

// const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");

const MAX_CONTENT_LENGTH = 100;
const SearchResults = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate,userToken]);

  const dispatch = useDispatch();
  const { loading, error, success, searchresults } = useSelector(
    (state) => state.blog
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  console.log("query:", query);
  const [searchResults, setSerachResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if(userToken){
    dispatch(searchBlogs(query));
    }
  }, [dispatch]);
  return (
    <>
      {loading && <Loader text="Loading..." />}
      {!loading && success && searchresults && (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            {searchresults.length === 0 ? (
              <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-semibold">No blogs found.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {searchresults.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex md:flex-row flex-col bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg"
                  >
                    <div className="md:w-1/3 p-4">
                      <img
                        src={blog.blogImage}
                        loading="lazy"
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>

                    <div className="md:w-2/3 p-4">
                      <span className="text-sm text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>

                      <h2 className="text-xl font-bold text-gray-800 mt-2">
                        <Link
                          to={`/your-blogs/blog/${blog._id}`}
                          className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                        >
                          {blog.title}
                        </Link>
                      </h2>

                      <div className="text-gray-500 mt-2">
                        {parse(blog.content.slice(0, MAX_CONTENT_LENGTH))}
                        {blog.content.length > MAX_CONTENT_LENGTH && "..."}
                      </div>

                      <div className="flex items-center mt-2">
                        <img
                          src={blog.user.pic}
                          loading="lazy"
                          alt={blog.user.username}
                          className="h-8 w-8 object-cover rounded-full"
                        />
                        <p className="text-gray-500 ml-2">
                          Author: {blog.user.username}
                        </p>
                      </div>

                      <div className="mt-2">
                        <Link
                          to={`/your-blogs/blog/${blog._id}`}
                          className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
