import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signup = async (req,res,next) => {
    // console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash})

        await newUser.save();
        res.status(200).send("User has been created")
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {

    try {
        const user = await User.findOne({ name: req.body.name });

        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(401, "Invalid credentials"));

        // res.status(200).json({ message: "Login successful" });
        // create jsonwebtoken
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const {password, ...others} = user._doc;

        res.cookie("access",token, {
            httpOnly:true
        }).status(200).json(others)
    } catch (error) {
        next(error);
    }
};