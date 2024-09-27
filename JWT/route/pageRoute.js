const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signUp");
});

router.get("/signin", (req, res) => {
  res.render("signIn", { message: req.flash("info") });
});
router.get("/sendmail", (req, res) => {
  res.render("sendMail", { message: req.flash("info") });
});

router.get("/changepass/:email", (req, res) => {
  const email = req.params.email;
  res.render("changePass", { message: req.flash("info"), email: email });
});

router.get("/updatepass", (req, res) => {
  res.render("updatePass", { message: req.flash("info")});
});


router.get("/", (req, res) => {
  if (!req?.cookies?.user) {
    req.flash("info", "should be login fist");
    res.redirect("/signin");
  }
  const user = req.cookies.user;
  console.log(user);
  res.render("dashboard", { user });
});

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("token");
  req.flash("info", "you are logged out");
  res.redirect("/signin");
});
module.exports = router;
