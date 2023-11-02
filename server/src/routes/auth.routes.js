import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  verifyToken,
} from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.scehma.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", auth, profile);

export default router;
