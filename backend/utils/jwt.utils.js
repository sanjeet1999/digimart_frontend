import jwt from 'jsonwebtoken';
import logger from './logger.js';
// import dotenv from 'dotenv';
// dotenv.config();

/**
 * Generates a JSON Web Token (JWT) for a given payload.
 *
 * The function uses the 'jsonwebtoken' library to sign the payload.
 * The token is configured to expire in 1 day ('1d').
 * The secret key used for signing is retrieved from the environment variable `process.env.JWT_SECRET`.
 *
 * @param {object} payload - The payload to be encoded in the JWT. This should be an object containing claims about the user. For example, `{ id: user.id, email: user.email }`.
 * @returns {string} The signed JWT.
 */
const generateToken = (payload) => {
    logger.info("creating jwt token for user");
    logger.debug(payload);
    
    // Use a fallback secret if JWT_SECRET is not set in environment
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
    
  return jwt.sign(payload, secret, {
    expiresIn: '1d', // expires in 24 hours
  });
};

export default generateToken; 