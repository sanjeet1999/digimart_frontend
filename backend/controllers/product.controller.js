import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";
import googleDriveService from "../utils/googleDrive.js";

const addProduct = async (req,res)=>{
    try {
        const {prodName, ProdDiscription, ProdQuantity, price, sellerId, Prodcategory} = req.body;
        const uploadedFile = req.file;
        
        logger.info("Product data received");
        logger.debug({ body: req.body, file: uploadedFile });

        // Check if file was uploaded
        if (!uploadedFile) {
            return res.status(400).json({
                success: false, 
                message: "Product image is required"
            });
        }
        
        // Validate user and check if user is seller
        const userData = await User.findOne({_id: sellerId});
        if (!userData) {
            logger.error("User not found");
            return res.status(404).json({success: false, message: "User not found"});
        }
        
        if (userData.UserRole !== "Seller") {
            logger.error("User is not a seller");
            return res.status(403).json({
                success: false, 
                message: "Only sellers can add products"
            });
        }

        logger.info("User is a seller, proceeding with product creation");

        let imageUrl;
        let imageInfo = {};

        // Try Google Drive first, fallback to local storage
        if (googleDriveService.isConfigured()) {
            try {
                logger.info("🚀 ATTEMPTING GOOGLE DRIVE UPLOAD");
                
                // Generate unique filename for Google Drive
                const timestamp = Date.now();
                const fileName = `${prodName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}_${uploadedFile.originalname}`;

                logger.info(`📁 Uploading to folder: ${googleDriveService.FOLDER_ID}`);
                logger.info(`📄 File name: ${fileName}`);
                
                // Upload image to Google Drive
                const driveUploadResult = await googleDriveService.uploadFile(uploadedFile, fileName);
                
                imageUrl = driveUploadResult.directLink;
                imageInfo = {
                    fileName: driveUploadResult.fileName,
                    viewLink: driveUploadResult.viewLink,
                    directLink: driveUploadResult.directLink,
                    storage: 'google_drive'
                };
                logger.info("✅ GOOGLE DRIVE UPLOAD SUCCESS!");
                logger.info(`🔗 Direct Link: ${driveUploadResult.directLink}`);
            } catch (uploadError) {
                logger.error("❌ GOOGLE DRIVE UPLOAD FAILED!");
                logger.error(`🔴 Error details: ${uploadError.message}`);
                logger.error(`🔴 Error stack: ${uploadError.stack}`);
                
                // Use local file path as fallback
                imageUrl = `/uploads/${uploadedFile.filename}`;
                imageInfo = {
                    fileName: uploadedFile.filename,
                    localPath: uploadedFile.path,
                    storage: 'local'
                };
                logger.info("⚠️ Using local storage as fallback");
            }
        } else {
            logger.warn("⚠️ Google Drive not configured, using local storage");
            // Use local storage
            imageUrl = `/uploads/${uploadedFile.filename}`;
            imageInfo = {
                fileName: uploadedFile.filename,
                localPath: uploadedFile.path,
                storage: 'local'
            };
            logger.info("📁 Using local storage for image");
        }

        // Create product with image URL (either Google Drive or local)
        const product = await Product.create({
            prodName,
            ProdDiscription,
            ProdQuantity: parseInt(ProdQuantity) || 1,
            ProdImage: [imageUrl],
            price: parseFloat(price),
            sellerId: userData._id,
            Prodcategory
        });

        logger.info("Product created successfully");
        logger.debug({ product });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: {
                product: product,
                imageInfo: imageInfo
            }
        });

    } catch (error) {
        logger.error("Error in addProduct", error);
        res.status(500).json({
            success: false, 
            message: "Internal server error: " + error.message
        });
    }
}
    
const updateProduct = async (req,res) => {
    const {id} = req.params;
    const {prodName,ProdDiscription,ProdQuantity,ProdImage,price,Prodcategory} = req.body
    logger.info(`Product update request received for id: ${id}`);
    logger.debug(req.body);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,{
            prodName,
            ProdDiscription,
            ProdQuantity,
            ProdImage,
            price,
            Prodcategory
        },{new:true})

        if(!updatedProduct){
            logger.error("Product not found for update");
            return res.status(404).json({success:false,message:"Product not found"});
        }
        logger.info("Product updated successfully");
        logger.debug(updatedProduct);
        res.status(200).json({success:true,message:"Product updated successfully",data:updatedProduct});

    } catch (error) {
        logger.error("Error updating product",error);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    logger.info(`Product deletion request received for id: ${id}`);
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            logger.error(`Product with id: ${id} not found for deletion`);
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        logger.info(`Product with id: ${id} deleted successfully`);
        logger.debug(deletedProduct);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        logger.error(`Error deleting product with id: ${id}`, error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getAllProducts = async (req, res) => {
    logger.info("Get all products request received");
    try {
        const products = await Product.find().populate('sellerId', 'UserName UserEmail').sort({ createdAt: -1 });
        
        logger.info(`Found ${products.length} products`);
        logger.debug(products);
        
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: {
                products: products,
                count: products.length
            }
        });
    } catch (error) {
        logger.error("Error fetching products", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getProductsBySeller = async (req, res) => {
    const { sellerId } = req.params;
    logger.info(`Get products by seller request received for sellerId: ${sellerId}`);
    
    try {
        const products = await Product.find({ sellerId: sellerId }).populate('sellerId', 'UserName UserEmail').sort({ createdAt: -1 });
        
        logger.info(`Found ${products.length} products for seller ${sellerId}`);
        logger.debug(products);
        
        res.status(200).json({
            success: true,
            message: "Seller products fetched successfully",
            data: {
                products: products,
                count: products.length
            }
        });
    } catch (error) {
        logger.error(`Error fetching products for seller ${sellerId}`, error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export {addProduct, updateProduct, deleteProduct, getAllProducts, getProductsBySeller}

