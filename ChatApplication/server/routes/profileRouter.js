import express from "express";
import { profileUpdate } from "../controllers/profileUpdate.js";
import upload from "../middleware/multer.js";
const profileRouter = express.Router();

profileRouter.put(`/:id`, upload.single("image"), profileUpdate);

export default profileRouter;
