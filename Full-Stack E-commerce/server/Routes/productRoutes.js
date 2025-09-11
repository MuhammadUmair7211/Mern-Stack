import express from "express";
import upload from "../config/multer.js";
import {
	deleteProductController,
	getProductsController,
	productController,
} from "../controllers/productController.js";
const productRouter = express.Router();

productRouter.post(
	"/",
	upload.array("images", 4),
	productController
);
productRouter.get("/", getProductsController);
productRouter.delete("/:id", deleteProductController);
export default productRouter;
