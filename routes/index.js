import express from "express";

const router = express.Router();
// import logic of register controller
import { registerControler } from "../controller";

router.post("/register", registerControler.register);

export default router;
