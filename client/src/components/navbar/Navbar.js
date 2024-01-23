import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import { AiOutlineLogout } from "react-icons/ai";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  function handleClicked() {
  
}
   
  return (
    <div className="Navbar">
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate("/profile")}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleClicked}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
