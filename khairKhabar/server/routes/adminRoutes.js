import express from "express";
import { adminController } from "../controller/adminController.js";
const adminRouter = express.Router();
adminRouter.post("/", adminController);
export default adminRouter;
