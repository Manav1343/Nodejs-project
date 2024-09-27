const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { isAdmin, verifyToken, isUser } = require('../middleware/verify');

router.post('/signup', userController.signUP);
router.post('/signin', userController.signIn);
router.post('/sendmail', userController.sendmail);
router.post('/passwordAuth', userController.passwordAuth);
router.post('/updatePass',verifyToken,isUser, userController.updatePass)


module.exports = router;
