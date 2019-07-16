const express = require("express");
const router = express.Router();
const userController = require('./user');
const {authenticating,authorizing} = require("../../../middlewares/auth")

const upload = require("../../../middlewares/uploadImage")

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/test-private",authenticating,authorizing(['passenger','driver']),userController.testPrivate);


router.post("/upload-avatar", authenticating, upload.single("avatar"),userController.uploadAvatar)
router.get("/:id",authenticating,userController.getUserById)
module.exports = router