const Post = require("../models/Post");
const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");
const mongoose = require("mongoose");

const getAllPostsController = async (req, res) => {
  console.log(req.ACCESS_TOKEN_SECRET);

  return res.status(200).send("getAllPostsController activated");
};

const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    if (!caption)
      return res.send(error(400,'Caption is required'))
    const owner = req._id;
    const user = await User.findById(req._id);
    const post = await Post.create({
      caption,
      owner,
    });

    Post.posts.push(post._id);
    await post.save();
    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likesAndUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }
    if (post.likes.includes(curUserId)) {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
      return res.send(success(200, "post Unliked"));
    } else {
      post.likes.push(curUserId);
      await post.save();
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "post not found"));
    }
    if (post.owner.toString() !== curUserId)
      return res.send(error(403, "only owners can update their posts"));

    if (caption) post.caption = caption;

    await post.save();
    return res.send(success(200, post));
  } catch (e) {
    return res.send(error(400, e.message));
  }
};

const deletePost=async (req,res)=>{
 try {
   const {postId}=req.body
   const curUserId=req._id
   const post=await Post.findById(postId)
   const curUser=await User.findById(curUserId)
    
   if(!post){
     return res.send(error(404,"post not found"));
   }
   if(post.owner.toString()!==curUserId){
     return res.send(error(403,"only owner can delete the post"));
   }
   const index=curUser.posts.indexOf(postId)
   curUser.posts.splice(index,1);
   await curUser.save()
   await post.remove();
   return res.send(success(200,'post deleted successfully'))
 
 } catch (e) {
  return res.send(error(500,e.message))
  
 }
}

module.exports = {
  createPostController,
  likesAndUnlikePost,
  updatePostController,
  deletePost,
};
