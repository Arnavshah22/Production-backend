import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";


import { upload } from "../middleware/multer.middleware";
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller";

const router=Router();

router.use(verifyJWT);

router.route('/').get(getAllVideos).post(upload.fields([{name:'videoFile',maxCount:1},{name:'thumbnail',maxCount:1}],publishAVideo));4
router.route("/:videoId").get(getVideoById).delete(deleteVideo).patch(upload.single("thumbnail"),updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;