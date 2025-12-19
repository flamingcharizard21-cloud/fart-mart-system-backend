const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: [true, "Email already used"],
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    role: {
      type: String,
      enum: ["user", "farmer"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minLength: [8, "Please length should be greater than 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password and confirm password is not the same",
      },
    },
  },
  { timestamps: true }
);
//this should run before saving, here pre is a middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
