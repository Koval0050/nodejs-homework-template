import express from "express";

import authController from "../../controllers/auth-controller.js";

import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSingUpSchema,
  userSingInSchema,
  userEmailSchema,
} from "../../models/User.js";

const authRouter = express.Router();

const userSingUpValidate = validateBody(userSingUpSchema);
const userSingInValidate = validateBody(userSingInSchema);
const userEmailValidate = validateBody(userEmailSchema);


authRouter.post(
  "/register",
  isEmptyBody,
  userSingUpValidate,
  authController.register
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody,
  userEmailValidate,
  authController.resendVerifyEmail
);

authRouter.post(
  "/login",
  isEmptyBody,
  userSingInValidate,
  authController.login
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authController.updateUserAvatar
);

export default authRouter;
