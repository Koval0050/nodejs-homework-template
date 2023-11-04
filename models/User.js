import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidators } from "../hooks/hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timeseries: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidators);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userSingUpSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const userSingInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});



const User = model("user", userSchema);
export default User;
