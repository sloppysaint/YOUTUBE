import express from "express"
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//update user
router.put("/:id", verifyToken ,update)
//get user

router.get("/find/:id", getUser)

//delete user
router.delete("/:id",verifyToken, deleteUser)

//subscribe

router.put("/subscribe/:id", verifyToken ,subscribe)

//unsubscribe

router.put("/unsubscribe/:id", verifyToken ,unsubscribe)
//like a video

router.put("/like/:videoId", verifyToken ,like)

//dislike a video

router.put("/dislike/:videoId", verifyToken ,dislike)


export default router;

