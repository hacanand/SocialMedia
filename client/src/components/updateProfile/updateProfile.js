import React, { useEffect, useState } from "react";
import "./updateProfile.scss";

import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slices/appConfigSlice";
function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
 
  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url || "");
  }, [myProfile]);

  function fileInputHandle(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      if (fileReader.readyState === FileReader.DONE) {
        setUserImg(fileReader.result[0]);
        console.log(fileReader.result); // This is the base64 string
      }
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );
  }

  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg} alt={name} />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={fileInputHandle}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target?.value)}
            />
            <input
              value={bio}
              type="text"
              placeholder="Your Bio"
              onChange={(e) => setBio(e.target?.value)}
            />
            <input type="submit" className="btn-primary" />
          </form>
          <button className="delete-account btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
