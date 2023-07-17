const express = require("express");

const router = express.Router();

const authController = require("../controllers/AuthController");

router.get("/login", authController.GetLogin);
router.post("/login", authController.PostLogin);
router.post("/logout", authController.PostLogout);
router.get("/signup", authController.GetSignUp);
router.post("/signup", authController.PostSignUp);




module.exports = router;