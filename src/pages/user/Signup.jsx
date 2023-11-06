import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/AuthAction";
const Signup = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    pic: null,
  });

  const navigate = useNavigate();
  const [errors,setErrors] = useState("");
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    

    if (success) navigate("/login");
  }, [navigate,success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.confirmpassword) {
      alert("Password mismatch");
    }
    if(!formData.email || !formData.password || !formData.username || !formData.confirmpassword) {
      setErrors("All Fields are required");
      return;
    }

    formData.email = formData.email.toLowerCase();
    dispatch(registerUser(formData));
    
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bg-img"></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              encType="multipart/form-data"
            >
              <InputComponent
                FieldName="username"
                id="username"
                type="text"
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

              <InputComponent
                FieldName="Email"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputComponent
                FieldName="Password"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <InputComponent
                FieldName="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="******************"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
              />

              <InputComponent
                FieldName="Pic"
                id="pic"
                type="file"
                name="pic"
                onChange={handleChange}
              />

              <div className="mb-6 text-center">
                <ButtonComponent
                  label={loading ? "Registering..." : "Register Account"}
                  onClick={handleSubmit}
                  isDisabled={loading}
                />
              </div>
              <hr className="mb-6 border-t" />

              <div className="text-center">
                <Link
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  to="/login"
                >
                  Already have an account? Login!
                </Link>
              </div>

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
                    
                      <li  className="text-red-500">
                        {error.message}
                      </li>
                    
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
