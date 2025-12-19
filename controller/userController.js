const jwt = require("jsonwebtoken");

const userModel = require("./../model/userModel");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
    expiresIn: parseInt(process.env.JWT_EXPIRES),
  });
};
exports.getAllUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    users,
  });
};
exports.login = async (req, res) => {
  //1.we need email and password
  const { email, password } = req.body;
  //2.check input
  if (!email || !password) {
    return res.status(400).json({
      status: "Fail",
      message: "Email and password should not be empty",
    });
  }
  const user = await userModel.findOne({ email }).select("+password"); //to selec the password along with the email
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "Fail",
      message: "Invalid email or password",
    });
  }
  //4.generate token
  const token = signToken(user._id);
  res.status(200).json({
    status: "Success",
    token,
    data: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
exports.register = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    console.log(newUser);
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      newUser,
    });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};
