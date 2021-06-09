import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt, { genSaltSync } from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please write your name"],
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please write your email"],
    unique: [true, "This email already registered. Please use another email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Email is incorrect. Please provide valid email",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minLength: [6, "Please provide password minimum 6 characters"],
    required: [true, "Please write password"],
    select: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
});

userSchema.pre("save", async function (this: any, next) {
  let user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, salt);
    user.password = hashedPass;
  }
  next();
});

export default mongoose.model("Auth", userSchema);
