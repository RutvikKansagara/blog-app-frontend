// BlogList.jsx
import React from "react";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs ,isYourBlogsPage}) => {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        {blogs.map((blog, index) => (
          <BlogItem key={index} 
          date={new Date(blog.createdAt).toLocaleDateString()}
          blogImage={blog.blogImage}
          title={blog.title}
          content={blog.content} 
          userImageUrl={blog.user.pic}
          username={blog.user.username}
          blogId={blog._id}
          isYourBlogsPage={isYourBlogsPage}
          />
        ))}
      </div>
    </>
  );
};

export default BlogList;
