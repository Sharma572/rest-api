import express from "express";

const router = express.Router();
// import logic of register controller
import { logInController, registerController as registerController,userController } from "../controller";
import auth from "../middleware/auth";

router.post("/register", registerController.register);
router.post("/login", logInController.login);
router.get("/me",auth, userController.me);

export default router;
