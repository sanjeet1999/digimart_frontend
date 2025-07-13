import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import logger from './logger.js';

class ThumbnailGenerator {
  constructor() {
    this.thumbnailSizes = {
      small: { width: 150, height: 150 },
      medium: { width: 300, height: 300 },
      large: { width: 500, height: 500 }
    };
    this.thumbnailsDir = path.join(process.cwd(), 'uploads', 'thumbnails');
    this.ensureThumbnailsDirectory();
  }

  /**
   * Ensure thumbnails directory exists
   */
  ensureThumbnailsDirectory() {
    if (!fs.existsSync(this.thumbnailsDir)) {
      fs.mkdirSync(this.thumbnailsDir, { recursive: true });
      logger.info(`Created thumbnails directory: ${this.thumbnailsDir}`);
    }
  }

  /**
   * Generate thumbnail from uploaded file
   * @param {Object} file - Multer file object
   * @param {string} size - Size key (small, medium, large)
   * @param {string} customName - Custom name for the thumbnail
   * @returns {Object} - Thumbnail info
   */
  async generateThumbnail(file, size = 'medium', customName = null) {
    try {
      logger.info(`🖼️ Generating ${size} thumbnail for: ${file.originalname}`);

      const sizeConfig = this.thumbnailSizes[size];
      if (!sizeConfig) {
        throw new Error(`Invalid thumbnail size: ${size}`);
      }

      // Generate thumbnail filename
      const fileExtension = path.extname(file.originalname);
      const baseName = customName || `thumb_${Date.now()}_${path.basename(file.originalname, fileExtension)}`;
      const thumbnailName = `${baseName}_${size}.webp`; // Always save as WebP for better compression
      const thumbnailPath = path.join(this.thumbnailsDir, thumbnailName);

      // Generate thumbnail using Sharp
      await sharp(file.path)
        .resize(sizeConfig.width, sizeConfig.height, {
          fit: 'cover', // Crop to fill the exact dimensions
          position: 'center'
        })
        .webp({ quality: 85 }) // Convert to WebP with good quality
        .toFile(thumbnailPath);

      // Get file stats
      const stats = fs.statSync(thumbnailPath);

      logger.info(`✅ Thumbnail generated: ${thumbnailName} (${stats.size} bytes)`);

      return {
        success: true,
        thumbnailName,
        thumbnailPath,
        thumbnailUrl: `/uploads/thumbnails/${thumbnailName}`,
        size: {
          width: sizeConfig.width,
          height: sizeConfig.height
        },
        fileSize: stats.size,
        format: 'webp'
      };

    } catch (error) {
      logger.error(`❌ Error generating thumbnail: ${error.message}`);
      throw new Error(`Thumbnail generation failed: ${error.message}`);
    }
  }

  /**
   * Generate multiple thumbnail sizes
   * @param {Object} file - Multer file object
   * @param {string} customName - Custom name for thumbnails
   * @param {Array} sizes - Array of sizes to generate
   * @returns {Object} - All thumbnails info
   */
  async generateMultipleThumbnails(file, customName = null, sizes = ['small', 'medium', 'large']) {
    try {
      logger.info(`🖼️ Generating multiple thumbnails for: ${file.originalname}`);

      const thumbnails = {};
      
      for (const size of sizes) {
        const thumbnail = await this.generateThumbnail(file, size, customName);
        thumbnails[size] = thumbnail;
      }

      logger.info(`✅ Generated ${sizes.length} thumbnails successfully`);

      return {
        success: true,
        thumbnails,
        count: sizes.length
      };

    } catch (error) {
      logger.error(`❌ Error generating multiple thumbnails: ${error.message}`);
      throw new Error(`Multiple thumbnail generation failed: ${error.message}`);
    }
  }

  /**
   * Delete thumbnail file
   * @param {string} thumbnailName - Name of the thumbnail file to delete
   * @returns {boolean} - Success status
   */
  deleteThumbnail(thumbnailName) {
    try {
      const thumbnailPath = path.join(this.thumbnailsDir, thumbnailName);
      
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
        logger.info(`🗑️ Deleted thumbnail: ${thumbnailName}`);
        return true;
      } else {
        logger.warn(`⚠️ Thumbnail not found for deletion: ${thumbnailName}`);
        return false;
      }
    } catch (error) {
      logger.error(`❌ Error deleting thumbnail: ${error.message}`);
      return false;
    }
  }

  /**
   * Get thumbnail info without generating
   * @param {string} thumbnailName - Name of the thumbnail
   * @returns {Object} - Thumbnail info
   */
  getThumbnailInfo(thumbnailName) {
    const thumbnailPath = path.join(this.thumbnailsDir, thumbnailName);
    
    if (fs.existsSync(thumbnailPath)) {
      const stats = fs.statSync(thumbnailPath);
      return {
        exists: true,
        thumbnailName,
        thumbnailPath,
        thumbnailUrl: `/uploads/thumbnails/${thumbnailName}`,
        fileSize: stats.size,
        lastModified: stats.mtime
      };
    }
    
    return {
      exists: false,
      thumbnailName
    };
  }
}

export default new ThumbnailGenerator(); 