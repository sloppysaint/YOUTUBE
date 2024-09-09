import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  videoID:{
    type: String,
    required: true,
  },
  description:{
    type:String,
    required: true,
    maxlength: 500,
  }
},
 { timestamps: true }
);
export default mongoose.model("Comment", CommentSchema);
