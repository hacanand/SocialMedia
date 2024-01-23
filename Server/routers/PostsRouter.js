const router = require("express").Router();
const postsController = require("../controllers/PostsController");
const requireUser = require("../middlewares/requireUser");

 
router.post("/", requireUser, postsController.createPostController);
router.post("/like", requireUser, postsController.likesAndUnlikePost);
router.put('/',requireUser,postsController.updatePostController)
router.delete('/',requireUser,postsController.deletePost)

module.exports = router;
