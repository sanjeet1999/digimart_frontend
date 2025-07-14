import express from "express";
import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductsBySeller } from "../controllers/product.controller.js";
import { uploadSingle, handleUploadError } from "../middleware/upload.middleware.js";

const productRoute = express.Router();

productRoute.get("/getAllProducts", getAllProducts)
productRoute.get("/seller/:sellerId", getProductsBySeller)
productRoute.post("/addProduct", uploadSingle, handleUploadError, addProduct)
productRoute.put("/updateProduct/:id",updateProduct)
productRoute.delete("/deleteProduct/:id",deleteProduct)




export default productRoute; 
