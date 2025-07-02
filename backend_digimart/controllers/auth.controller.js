import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import { redisClient } from '../config/redisClient.js';
import jwt from 'jsonwebtoken';
import logger from "../utils/logger.js";
import generateToken from "../utils/jwt.utils.js";
import { createAuthenticationError, createAuthorizationError, createInvalidCredentialsError, createTokenExpiredError, createValidationError, createMissingFieldError, createInvalidFormatError, createNotFoundError, createConflictError, createGoneError, createSellerOnlyError, createBuyerOnlyError, createOwnershipError } from "../utils/error.js";

export const signup = async (req,res)=>{
    try{
        const { UserPassword, ...userInfo } = req.body;
        logger.info("Signup request received");
        logger.debug({ user: userInfo }); 

        const {UserName,UserRole,UserEmail} = req.body;

        const userExist = await User.findOne({UserEmail})
    
        if(userExist){
            logger.error("User already exists");
            return res.status(400).json({success:false,message:"User already exists"}); 
        }
        logger.info("Creating user");
        try{
            const user = await User.create({UserName,UserRole,UserEmail,UserPassword: req.body.UserPassword})
            logger.info("User created successfully");
            logger.debug({ user: user });
        }catch(error){
            logger.error({ err: error }, "Error during user creation");
            return res.status(500).json({success:false,message:error.message});
        }
        res.status(201).json({success:true,message:"User created successfully"});  
    }catch(error){
        logger.error({ err: error }, "Error during signup");
        res.status(500).json({success:false,message:error.message});
    }
};

export const login = async (req,res)=>{
    try {
        const { loginEMail, Password } = req.body;

        if (!loginEMail || !Password){
            logger.error("Email and password are required");
            return res.status(400).json({success: false, message:"Email and password are required"});
        }

        logger.info("Login request received for user: " + loginEMail);

        const user = await User.findOne({ UserEmail: loginEMail });
        
        if(!user){
            logger.error("User not found: " + loginEMail);
            return res.status(404).json({success: false, message:"User not found"});
        }

        const isMatch = await bcrypt.compare(Password, user.UserPassword);
        
        if(!isMatch){
            logger.error("Invalid credentials for user: " + loginEMail);
            return res.status(401).json({success: false, message:"Invalid credentials"});
        }

        const payload = {
            id: user._id,
            email: user.UserEmail,
            role: user.UserRole
        };
        const token = generateToken(payload);
        logger.info("JWT token created successfully");
        logger.debug(token);
        
        // Create a clean user object without password
        const userResponse = {
            _id: user._id,
            UserName: user.UserName,
            UserEmail: user.UserEmail,
            UserRole: user.UserRole,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        
        logger.info("User response object created");
        logger.debug(userResponse);
        
        return res.status(200).json({
            success: true, 
            message:"User logged in successfully", 
            data: {
                user: userResponse,
                token
            }
        });
    } catch (error) {
        logger.error({ err: error }, "Error during login");
        res.status(500).json({success: false, message: "An internal server error occurred"});
    }
}

export const logout = async (req,res)=>{
    try {
        logger.info("Logout request received");
        logger.debug({ user: req.user });
        // In a real app, you would invalidate a session or JWT here.
        res.status(200).json({success: true, message: "User logged out successfully"});
    } catch (error) {
        logger.error({ err: error }, "Error during logout");
        res.status(500).json({success: false, message: "An internal server error occurred"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const { UserName, UserEmail } = req.body;

        logger.info(`Update request received for user ID: ${_id}`);
        logger.debug({ user: req.user, body: req.body });

        const userToUpdate = await User.findById(_id);

        if (!userToUpdate) {
            logger.error(`User not found for ID: ${_id}`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (UserEmail && UserEmail !== userToUpdate.UserEmail) {
            const existingUser = await User.findOne({ UserEmail });
            if (existingUser) {
                logger.error(`Email ${UserEmail} is already in use.`);
                return res.status(400).json({ success: false, message: "Email is already in use" });
            }
            userToUpdate.UserEmail = UserEmail;
        }

        if (UserName) {
            userToUpdate.UserName = UserName;
        }

        await userToUpdate.save();

        userToUpdate.UserPassword = undefined;

        logger.info(`User ${_id} updated successfully.`);
        logger.debug({ user: userToUpdate });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                user: userToUpdate,
            },
        });
    } catch (error) {
        logger.error({ err: error }, "Error during user update");
        res.status(500).json({ success: false, message: "An internal server error occurred" });
    }
};






