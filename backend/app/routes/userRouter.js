import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  register,
  login,
  updateUser,
  getUser,
  getUsers,
  updateProfile,
  deleteUser,
  resetPassword,
  resetPasswordWithToken,
  getProductOwners,
} from "../controllers/user.js";
import checkAccess from "../middleware/checkAccess.js";
import userPermissions from "../middleware/permissions/userPermissions.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getUser/:userId", getUser);
userRouter.get("/getUsers", checkAccess(userPermissions.getUsers), getUsers);
userRouter.get("/getProductOwners", getProductOwners);
userRouter.patch("/updateUser/:userId", checkAccess(userPermissions.updateUser), updateUser);
userRouter.patch("/updateProfile/", auth, updateProfile);
userRouter.delete("/deleteUser/:userId", deleteUser);
userRouter.post("/resetPassword/", resetPassword);
userRouter.patch("/resetPasswordWithToken", resetPasswordWithToken);

export default userRouter;
