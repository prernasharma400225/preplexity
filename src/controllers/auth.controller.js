import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]
    });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User with this email or username already exists",
            success: false,
            err: "User already exists"
        })
    }

    const user = await userModel.create({ username, email, password})

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity",
        html: `<p>Hi <strong>${username}</strong>,</p>
        <p>Welcome to <strong>Perplexity</strong>! We're glad to have you on board.</p>`
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })

}