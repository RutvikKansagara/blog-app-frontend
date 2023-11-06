import React, {  useEffect, useState } from "react";



import { Link, useNavigate } from 'react-router-dom';
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../features/auth/AuthAction'

const Login = () => {
  const { loading, userInfo,userToken,userId, error,loginSuccess } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors,setErrors] = useState("");
  
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
//  const token = localStorage.getItem("userToken");
 
 
 
 const handleSubmit = (e) => {
   e.preventDefault();
   if(!formData.email || !formData.password){
      setErrors("email password required");
   }
   dispatch(userLogin(formData));
   
  };
  
  useEffect(() => {
    
    if (loginSuccess) {
       
      navigate("/blog/create");
    }
  }, [navigate,loginSuccess]);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bg-img"></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Login to Your Account</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
              
              <ButtonComponent
                  label={loading ? "Logging in..." : "Login"}
                  onClick={handleSubmit}
                  isDisabled={loading}
                />              
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="/forgot-password"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <Link
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  to="/register"
                >
                  Don't have an account? Sign Up!
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
              {error   && (
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

export default Login;

