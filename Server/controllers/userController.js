const Post = require("../models/Post");
const User = require("../models/User");
import { v2 as cloudinary } from "cloudinary";
import { mapPostOutput } from "../utils/Utils";
const { error, success } = require("../utils/responseWrapper");

const followOrUnfollowUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const curUserId = req._id;
    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);
    if (curUserId === userIdToFollow)
      return res.send(error(400, "you can't follow yourself"));
    if (!userToFollow) return res.send(error(404, "user to follow not found"));
    if (curUser.followings.includes(userIdToFollow)) {
      const index = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(index, 1);
      const followerIndex = userToFollow.followers.indexOf(curUserId);
      userToFollow.followers.splice(followerIndex, 1);
      await curUser.save();
      await userToFollow.save();
      return res.send(success(200, "user unfollowed"));
    } else {
      curUser.followings.push(userIdToFollow);
      userToFollow.followers.push(curUserId);
      await curUser.save();
      await userToFollow.save();
      return res.send(success(200, "user followed"));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getPostFollowing = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    const posts = await Post.find({
      owner: { $in: curUser.followings },
    });
    return res.send(success(200, posts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyPosts = async (req, res) => {
  try {
    const curUserId = req._id;
    const allUserPosts = await Post.find({
      owner: curUserId,
    }).populate("likes");
    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.body.userId;

    const allUserPosts = await Post.find({
      owner: userId,
    }).populate("likes");
    return res.send(success(200, { allUserPosts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const deleteMyProfile = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);
    //delete all posts
    await Post.deleteMany({
      owner: curUserId,
    });
    //remove myself from followers followings
    curUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(curUserId);
      follower.followings.splice(index, 1);
      await follower.save();
    });
    //remove myself from my following followers
    curUser.followings.forEach(async (followerId) => {
      const following = await User.findById(followerId);
      const index = following.followers.indexOf(curUserId);
      following.followers.splice(index, 1);
      await following.save();
    });
    //remove myself from all likes
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
    });
    // @ts-ignore
    await curUser.remove();
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.send(error(200, "user deleted"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    return res.send(success(200, user));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, userImg } = req.body;
    const user = await User.findById(req._id);
    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (userImg) {
      const cloudImg = await cloudinary.uploader.upload(userImg, {
        folder: "social_media",
      });
      user.avatar = {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      };
    }
    await user.save();
    return res.send(success(200, user));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
const getUserProfile = async (req, res) => { 
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId).populate({
      path: 'posts',
      populate: {
        path:'owner'
      }
    });
    const fullPosts = user.posts;
    const posts=fullPosts.map(item=>mapPostOutput(item,req._id)).reverse()
    return res.send(success(200,{...user._doc,posts}))
  } catch (e) {
    return res.send(error(500, e.message));
  }
}
export default {
  followOrUnfollowUser,
  getPostFollowing,
  getMyPosts,
  deleteMyProfile,
  getUserPosts,
  getMyInfo,
  updateUserProfile,
  getUserProfile,
};
