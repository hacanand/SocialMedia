const requireUser = require("../middlewares/requireUser");
const userController = require("../controllers/userController");

const router = require("express").Router();
router.post("/follow", requireUser, userController.followOrUnfollowUser);
router.get("/postFollowing", requireUser, userController.getPostFollowing);
router.get('getMyPosts', requireUser, userController.getMyPosts)
router.get('/getUserPosts', requireUser, userController.getUserPosts)
router.get('/getMyInfo', requireUser, userController.getMyInfo)
router.put("/updateProfile", userController.updateProfileController);
module.exports = router;