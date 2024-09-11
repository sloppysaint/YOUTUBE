import jwt from "jsonwebtoken"
import { createError } from "../server/error.js"

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access
    if(!token) return next(createError(401, "No token provided"))

    jwt.verify(token, process.env.JWT_SECRET,(err,user) => {
        if(err) return next(createError(403, "fuck token"))
        req.user = user;
        next()
    })
}