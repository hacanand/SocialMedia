import Avatar from "../avatar/Avatar";
import "./CreatePost.scss";
import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
// @ts-ignore
//import Background from "../../assets/background.jpg";
import axiosClient from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const [postImg, setPostImg] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  }
  const handlePostSubmit = async (res, req) => {
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.post("/post", {
        caption,
        postImg,
      });
      console.log("post done", result);
    } catch (e) {
      return res.send(500, e.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="CreatePost">
      <div className="left-part">
        <Avatar src={undefined} />
      </div>
      <div className="right-part">
        <input
          type="text"
          className="captionInput"
          placeholder="What on your mind?"
          onChange={(e) => setCaption(e.target.value)}
        />
        {postImg && (
          <div className="img-container">
            <img className="post-img" src={postImg} alt="post-Img" />
          </div>
        )}

        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
