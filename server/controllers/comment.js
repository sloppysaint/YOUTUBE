import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

import { createError } from "../error.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, UserID: req.user.id });
    try {
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id); // Fixed typo here
      if (!comment) return next(createError(404, "Comment not found"));
  
      const video = await Video.findById(req.params.id); // Fixed typo here
      if (req.user.id === comment.UserID || req.user.id === video.UserID) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send("Comment deleted successfully");
      } else {
        return next(createError(403, "You cannot delete this comment"));
      }
    } catch (error) {
      next(error);
    }
  };
  
  export const getComment = async (req, res, next) => {
    try {
      const comment = await Comment.find({ videoID: req.params.videoId }); // Fixed to use "videoID"
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };
  