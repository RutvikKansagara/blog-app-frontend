import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../arrow.svg";
import parse from "html-react-parser";
import editIcon from "../../edit-round-icon.svg";
import deleteIcon from "../../recycle-bin-line-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogById } from "../../features/blog/BlogAction";
const MAX_CONTENT_LENGTH = 100;
const BlogItem = ({
  date,
  title,
  content,
  userImageUrl,
  username,
  blogId,
  isYourBlogsPage,
}) => {
  const truncatedContent = parse(content.slice(0, MAX_CONTENT_LENGTH));

  const isContentTruncated = content.length > MAX_CONTENT_LENGTH;
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.blog);

  const handleDelete = (blogId) => {
    dispatch(deleteBlogById(blogId));
  };

  return (
    <>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="text-sm">{date}</span>
          {isYourBlogsPage && (
            <div className="flex items-center space-x-4">
              <Link to={`/your-blogs/blog/edit/${blogId}`}>
                <img src={editIcon} alt="Edit Icon" className="w-6 h-6" />
              </Link>

              <button onClick={() => handleDelete(blogId)}>
                <img src={deleteIcon} alt="Delete Icon" className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/your-blogs/blog/${blogId}`}>{title}</Link>
        </h2>
        <div className="mb-5 font-light text-gray-500 dark:text-gray-400">
          {truncatedContent}
          {isContentTruncated && "..."}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="w-7 h-7 rounded-full"
              src={userImageUrl}
              alt={`${username} avatar`}
            />
            <span className="font-medium dark:text-white">{username}</span>
          </div>

          <Link
            to={`/your-blogs/blog/${blogId}`}
            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
          >
            Read more
            <img src={arrow} alt="arrow icon" className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogItem;
