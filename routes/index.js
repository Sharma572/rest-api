import express from "express";

const router = express.Router();
// import logic of register controller
import { logInController, registerController as registerController,userController } from "../controller";
import refreshController from "../controller/auth/refreshController";
import auth from "../middleware/auth";

router.post("/register", registerController.register);
router.post("/login", logInController.login);
router.get("/me",auth, userController.me);
router.post("/refresh", refreshController.refresh);

export default router;
