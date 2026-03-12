import { Router  } from "express";
import { registerValidation,loginValidation } from "../validators/auth.validator.js";
import { register, verifyEmail , login, getMe} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username, email, password}
 */
authRouter.post("/register",registerValidation(), register)

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body {email, password}
 */
authRouter.post("/login", loginValidation, login)


authRouter.get("/get-me", authUser, getMe)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get('/verify-email',verifyEmail)

export default authRouter;