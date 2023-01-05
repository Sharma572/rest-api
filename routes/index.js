import express from "express";

const router = express.Router();
// import logic of register controller
import { registerController as registerController } from "../controller";

router.post("/register", registerController.register);

export default router;
