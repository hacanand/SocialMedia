import React, { useEffect } from "react";
import Post from "../post/Post";
import "./Profile.scss";

// @ts-ignore
import userImg from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../redux/slices/postSlice";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [params]);
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          <CreatePost />
          <Post Post={undefined} />
          <Post Post={undefined} />
          <Post Post={undefined} />
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userImg} alt="user-img" />
            <h3 className="user-name">Anand</h3>
            <div className="follower-info">
              <h4>40 Followers</h4>
              <h4>12 Following</h4>
            </div>
            <button className="follow btn-primary">Follow</button>
            <button
              className="update-profile btn-secondary "
              onClick={() => navigate("/updateProfile")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
