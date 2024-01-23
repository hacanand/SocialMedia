import React from 'react'
import './feed.scss'
import Post from  '../post/Post'
import Follower from '../follower/Follower'

function Feed() {
  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          <Post Post={undefined} />
          <Post Post={undefined} />
          <Post Post={undefined} />
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className='title'>You are Following</h3>
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
          <div className="suggestions">
            <h3 className='title'>Suggestion for You</h3>
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
        </div>
      </div>
   </div>
  )
}

export default Feed