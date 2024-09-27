const sendMailer = require("../config/mailer");
const User = require("../model/userModel");
const { sendOtp } = require("../util/htmlFormat");
const { haspass, comaparePass } = require("../util/password");

exports.store = async (req, res) => {
  try {
    const { username, number, email, password } = req.body;
    const newhasPass = await haspass(password);
    const user = await User.create({
      username,
      number,
      email,
      password: newhasPass,
    });
    if (user) {
      // res.json({message:"data inserted"})
      res.redirect("/signin");
    } else {
      res.json({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.json({ message: "user not found" });
    }
    const match = await comaparePass(user.password, password);
    if (!match) {
      res.json({ message: "password not found" });
    }
    const userList = {
      name: user.username,
      email: user.email,
    };
    res.cookie("user", userList, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const userotp = await User.findOne({ email: email });
    const otp = Math.floor(Math.random() * 10000);
    if (userotp) {
      const update = await User.findByIdAndUpdate(
        {
          _id: userotp._id,
        },
        {
          otp: otp,
        }
      );
      if (update) {
        sendMailer(email, '',sendOtp(userotp.username,otp));
        res.json("check your mail")
        res.redirect("/sendmail");
      }
    } else {
      // res.json("user not found")
      res.redirect("/forget");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.setPass = async (req, res) => {
  try {
    const { email, otp, newpass, confirmpass } = req.body;
    const existUser = await User.findOne({ email: email });

    if (!existUser) {
      res.json("user not found");
    }
    if (existUser.otp != Number(otp)) {

      res.json("otp not match");
    }
    if (newpass !== confirmpass) {
      res.json("pass not match");
    }
    const hasspass2 = await haspass(newpass);
    const updateUser = await User.findByIdAndUpdate(
      { _id: existUser._id },
      {
        password: hasspass2,
        otp: "",
      }
    );
    if (updateUser) {
    //   res.json("your pass has benn change");
      res.redirect('/signin')
    }
  } catch (error) {
    console.log(error);
  }
};
