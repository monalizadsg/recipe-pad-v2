import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("users", UserSchema);
