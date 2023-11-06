import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogDetails,
  updateBlogDetails,
} from "../../features/blog/BlogAction";
import { isAuthenticated } from "../../utils/authUtils";
const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");
const EditBlog = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate]);
  const dispatch = useDispatch();
  const { loading,  error,success, blogsuccess,blogupdatesuccess,blogDetailsById,blogUser,blogImageUrl } = useSelector(
    (state) => state.blog
  );
  const {blogId} = useParams();
  
  const [isLoading,setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      title: "",
      content: "",
      blogImage: null,
    });


useEffect(() => {
  if (userToken) {
    dispatch(getBlogDetails(blogId));
  }
}, [dispatch]);
  

useEffect(() => {
  if (blogsuccess && blogDetailsById) {
    setFormData({
      title: blogDetailsById.title,
      content: blogDetailsById.content,
      
    });
  }
}, [blogsuccess, blogDetailsById]);

  

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (type === "text") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCkEditorChange = (e, editor) => {
    const content = editor.getData();
    setFormData({ ...formData, content: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {...formData,blogId:blogId}
    dispatch(updateBlogDetails(updatedData));
    
  };

  useEffect(() => {
    if (blogupdatesuccess) {
      navigate("/blog/create");
    }
  }, [navigate, blogupdatesuccess]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
    {isLoading && <Loader text="Loading..." />}
    {!isLoading && (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
        <h3 className="pt-4 mt-5 text-2xl text-center">Edit Blog</h3>
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          {/* Title Input */}
          <InputComponent
            FieldName="Title"
            id="Title"
            type="text"
            placeholder="Blog Title..."
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {/* Content Input */}
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="content"
            >
              Blog Content
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={(e, editor) => handleCkEditorChange(e, editor)}
            />
          </div>

          {/* Blog Image Input */}
          <InputComponent
            FieldName="Blog Image"
            id="blogImage"
            type="file"
            name="blogImage"
            onChange={handleChange}
          />

          {/* Submit Button */}
          <div className="mb-6 text-center">
            <ButtonComponent
              label={loading ? "Updating..." : "Update Blog"}
              onClick={handleSubmit}
              isDisabled={loading}
            />
          </div>

          {/* Optional: Add more UI elements as needed */}

          <hr className="mb-6 border-t" />
        </form>
      </div>
    </div>
    )}
    </>
  );
};

export default EditBlog;
