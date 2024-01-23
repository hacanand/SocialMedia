import React from 'react'
import './Avatar.scss'
 
// @ts-ignore
import  userImg  from "../../assets/user.png"
 
function Avatar({src}) {
  return (
      <div className='Avatar'>
          <img src={src?src:userImg } alt="user_avatar" />
    </div>
  )
}

export default Avatar