import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { postBlog } from "../../features/blog/BlogAction";
import { isAuthenticated } from "../../utils/authUtils";

// const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");

const CreateBlog = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate,userToken]);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState();
  const { loading, error, success } = useSelector((state) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    content: "",

    blogImage: null,
  });

  const handleChange = (e) => {
    // If the field is a file input, handle it differently
    const { name, type, value } = e.target;
    if (type === "file") {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: e.target.files[0] }));
    } else if (type === "text" && name === "title") {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleCkEditorChange = (e, editor) => {
    const content = editor.getData();
    setFormData({ ...formData, content: content });
  };

  useEffect(() => {
    if (success) navigate("/all-blogs");
  }, [navigate, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1234567890);
    console.log(formData);
    if (!formData.title || !formData.content || !formData.blogImage) {
      setErrors("All Fields are required");
      return;
    }

    dispatch(postBlog(formData));
  };

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
        <h3 className="pt-4 text-2xl text-center">Create a Blog</h3>
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
              label={loading ? "Saving..." : "Post Blog"}
              onClick={handleSubmit}
              isDisabled={loading}
            />
          </div>

          <hr className="mb-6 border-t" />
          {/* {errors && (
                <div className="mb-4 ring-2 ring-red-400 p-3 mt-5">
                  <ul className="space-y-1">
                    
                      <li  className="text-red-500">
                        {errors}
                      </li>
                    
                  </ul>
                </div>
              )} */}
          {error && (
            <div className="mb-4 ring-2 ring-red-400 p-3 mt-5">
              <ul className="space-y-1">
                <li className="text-red-500">{error.message}</li>
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
