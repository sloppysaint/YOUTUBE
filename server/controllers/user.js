import User from '../models/User.js';
import { createError } from '../error.js';

export const update = async ( req , res, next) => {
    if(req.params.id === req.user.id){
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            { new: true }
        )
            res.status(200).json( updatedUser)
        } catch (error) {
            next(error)
        }
    }
    else{
        return next(createError(403, "you can update only your account"))
    }
}
export const deleteUser = async (req,res,next) => {
    if(req.params.id === req.user.id){
        try {
             await User.findByIdAndDelete(req.params.id
            
        )
            res.status(200).json( "user has been deleted")
        } catch (error) {
            next(error)
        }
    }
    else{
        return next(createError(403, "you can delete only your account"))
    }
}
export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const subscribe = async (req,res,next) => {
    try {
        await User.findById(req.user.id, {
            $push:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: -1},
        });
        res.status(200).json("User subscribed successfully")
    } catch (error) {
        next(error)
    }
}
export const unsubscribe = async (req,res,next) => {
    try {
        await User.findById(req.user.id, {
            $pull:{subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: 1},
        });
        res.status(200).json("User subscribed successfully")
    } catch (error) {
        next(error)
    }
}
export const like = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}
export const dislike = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}