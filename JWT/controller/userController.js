const User = require("../model/userModel");
const { sendOtpUi } = require("../utill/htmlFormat");
const sendMailer = require("../utill/mailer");
const { haspass, comparePass } = require("../utill/password");
const jwt = require("jsonwebtoken");

exports.signUP = async (req, res) => {
  try {
    const { username, user_email, user_pass, user_phone } = req.body;
    const hashpass = await haspass(user_pass);
    const email = await User.findOne({ user_email: user_email });
    if (email) {
      return res.json("email already exist");
    }
    const user = await User.create({
      username,
      user_email,
      user_pass: hashpass,
      user_phone,
      user_profile: req?.file?.filename,
    });
    if (user) {
      //  res.status(201).json("data inserted")
      res.redirect("/signin");
    } else {
      res.status(500).json("something error");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { user_email, user_pass } = req.body;
    const existUser = await User.findOne({ user_email: user_email });
    if (!existUser) {
      // res.json("user not found")
      req.flash("info", "user not found");
      return res.redirect("/signin");
    }

    const hashpass = existUser.user_pass;
    const matchPass = await comparePass(user_pass, hashpass);
    console.log(matchPass);
    if (!matchPass) {
      req.flash("info", "password not match");
      return res.redirect("/signin");
    }

    const payload = {
      id: existUser._id,
      roleId: existUser.user_roleId,
    };

    const user = {
      name: existUser.username,
      email: existUser.user_email,
    };
    const token = jwt.sign(payload, "mykey", {
      expiresIn: "1d",
    });
    console.log(token);
    if (token) {
      res.cookie("token", token, { httpOnly: true });
      res.cookie("user", user, { httpOnly: true });
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.sendmail = async (req, res) => {
  try {
    const { user_email } = req.body;
    const emilexist = await User.findOne({ user_email: user_email });
    if (!emilexist) {
      req.flash("info", "user not exist");
      return res.redirect("/signin");
    }
    const link = `${process.env.WEBSITE_URL}/changepass/${user_email}`;
    console.log(link);
    sendMailer(
      user_email,
      "Forget password",
      sendOtpUi(emilexist.username, link)
    );
    req.flash("info", "mail send succesfully");
    res.redirect("/sendmail");
  } catch (error) {
    console.log(error);
  }
};

exports.passwordAuth = async (req, res) => {
  const { user_email, user_pass, conform_pass } = req.body;
  const checkmail = await User.findOne({ user_email: user_email });
  if (!checkmail) {
    console.log(user_email);
    req.flash("info", "user not exist");
    return res.redirect(`/changepass/${user_email}`);
  }

  if (user_pass !== conform_pass) {
    req.flash("info", "Confirm Password not match");
    return res.redirect(`/changepass/${user_email}`);
  }

  const hashPass = await haspass(user_pass);
  const updatepass = await User.updateOne(
    {
      user_email: user_email,
    },
    {
      user_pass: hashPass,
    }
  );
  if (updatepass) {
    req.flash("info", "password succesfully changed");
    res.redirect("/signin");
  }
};

exports.updatePass = async (req,res) =>{
  try {
    const {user_pass,new_pass,conform_pass} = req.body;
    const email = req.cookies.user.email;
    console.log(email);
    const existUser = await User.findOne({user_email:email})
    const old_pass = await comparePass(user_pass,existUser.user_pass)
    if(!old_pass){
      req.flash("info","old password not match")
    }
    if(!new_pass !== conform_pass){
      req.flash("info","confirm password not match")
    }
  
    const hashnewPass = await haspass(new_pass)
    const update = await User.updateOne(
      {user_email:email},
      {
        user_pass:hashnewPass
      }
    )
    if(update){
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }

  
}





