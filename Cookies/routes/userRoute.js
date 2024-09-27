const express = require('express');
const router = express.Router();
const userController = require('../controller/userControll')

router.post("/signup",userController.store)
router.post("/signin",userController.signin)
router.post("/sendotp",userController.sendOtp)
router.post("/setPass",userController.setPass)


module.exports = router