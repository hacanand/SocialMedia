import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss'
import { FcLike } from "react-icons/fc";
// @ts-ignore
import BackgroundImg from '../../assets/background.jpg'
function Post({Post}) {
  return (
    <div className="Post">
      <div className="heading">
        <Avatar src={undefined} />
        <h4>anand</h4>
      </div>
      <div className="content">
        <img src={BackgroundImg} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <FcLike className="icon"/>
          <h4>4 Likes</h4>
        </div>
        <p className='caption'>This is nature Lorem ipsum dolor, sit amet consectetur</p>
        <h6 className='time-ago'>4hrs ago </h6>
      </div>
    </div>
  );
}

export default Post
