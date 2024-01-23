
const router = require("express").Router();
const authController = require("../controllers/authcontroller");

router.post("/", (req, res) => {
  res.status(200).send("authRouter activated");
});

router.post("/signUp", authController.signUpController);
router.post("/login", authController.loginController);
router.get("/refresh", authController.refreshTokenController);
router.post("logout",authController.logoutController)
 
module.exports = router;
