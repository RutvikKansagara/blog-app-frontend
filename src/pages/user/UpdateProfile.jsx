import React, { useState, useEffect } from "react";

import {
  useNavigate,
  // useParams
} from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserDetails,
} from "../../features/user/UserAction";
import { isAuthenticated } from "../../utils/authUtils";

const userToken = localStorage.getItem("userToken");
// const userId = localStorage.getItem("userId");
const UpdateProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // If not authenticated, initiate login
    if (!isAuthenticated(userToken)) {
      navigate("/login");
    }
  }, [navigate]);
  const dispatch = useDispatch();
  const { loading, userDetails, error, success, updateSuccess, userImageUrl } =
    useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pic: null,
    profilePic: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (success && userDetails) {
      setFormData({
        username: userDetails.user_details.username,
        email: userDetails.user_details.email,
        pic: userImageUrl,
      });
    }
  }, [success, userDetails, userImageUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateUserDetails(formData));
  };

  useEffect(() => {
    if (updateSuccess) {
      navigate("/posts");
    }
  }, [navigate, updateSuccess]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading && <Loader text="Loading Profile Details..." />}
      {!isLoading && (
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
              <h3 className="pt-4 text-2xl text-center">
                Update Profile Details
              </h3>
              <div className="w-1/2 mx-auto flex justify-center my-5">
                {formData.pic && (
                  <img
                    src={formData.pic}
                    loading="lazy"
                    alt="Profile"
                    className="w-24 h-24 rounded-full cursor-pointer"
                  />
                )}
              </div>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                  FieldName="Want to Update Image ?"
                  id="pic"
                  type="file"
                  name="profilePic"
                  onChange={handleChange}
                />
                <div className="mb-6 text-center">
                  <ButtonComponent
                    label={loading ? "Updating..." : "Update Profile"}
                    onClick={handleSubmit}
                    isDisabled={loading}
                  />
                </div>
                <hr className="mb-6 border-t" />
                {error && (
                  <div className="mb-4 ring-2 ring-red-400 p-3 mt-5">
                    <ul className="space-y-1">
                      <li className="text-red-500">{error}</li>
                    </ul>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
