import express from "express";

const router = express.Router();
// import logic of register controller
import { logInController, registerController as registerController } from "../controller";

router.post("/register", registerController.register);
router.post("/login", logInController.login);

export default router;
