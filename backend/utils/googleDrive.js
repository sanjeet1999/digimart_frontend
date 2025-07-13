import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import logger from './logger.js';

class GoogleDriveService {
  constructor() {
    this.initialized = false;
    this.credentials = null;
    this.auth = null;
    this.drive = null;
    this.FOLDER_ID = null;
    
    // Try to initialize immediately
    this.initialize();
  }

  /**
   * Initialize or re-initialize the service with current environment variables
   */
  initialize() {
    try {
      // Load credentials from environment variables
      this.credentials = {
        type: "service_account",
        project_id: process.env.GOOGLE_DRIVE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_DRIVE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_DRIVE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.GOOGLE_DRIVE_CLIENT_EMAIL || '')}`,
        universe_domain: "googleapis.com"
      };

      this.FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

      // Check if all required credentials are available
      if (this._hasAllCredentials()) {
        // Initialize Service Account authentication
        this.auth = new google.auth.GoogleAuth({
          credentials: {
            ...this.credentials,
            private_key: this.credentials.private_key.replace(/\\n/g, '\n'),
          },
          scopes: [
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive'
          ]
        });

        this.drive = google.drive({ version: 'v3', auth: this.auth });
        this.initialized = true;
        
        // Log setup status only once
        if (!this._hasLoggedStatus) {
          this.logSetupStatus();
          this._hasLoggedStatus = true;
        }
      } else {
        this.initialized = false;
        logger.debug('Google Drive service not initialized - waiting for environment variables');
      }
    } catch (error) {
      this.initialized = false;
      logger.debug(`Google Drive initialization failed: ${error.message}`);
    }
  }

  /**
   * Check if all required credentials are available
   */
  _hasAllCredentials() {
    const required = [
      this.credentials?.project_id,
      this.credentials?.private_key_id,
      this.credentials?.private_key,
      this.credentials?.client_email,
      this.credentials?.client_id,
      this.FOLDER_ID
    ];
    return required.every(field => field && field.length > 0);
  }

  /**
   * Log setup status and instructions
   */
  logSetupStatus() {
    if (this.isConfigured()) {
      logger.info('✅ Google Drive Service Account loaded from environment variables');
      logger.info(`📧 Service Account Email: ${this.credentials.client_email}`);
      logger.info(`📁 Upload Folder ID: ${this.FOLDER_ID}`);
      logger.info(`🔗 Direct folder link: https://drive.google.com/drive/folders/${this.FOLDER_ID}`);
      logger.info('');
      logger.info('🔧 To ensure uploads work:');
      logger.info(`   1. Share your Google Drive folder with: ${this.credentials.client_email}`);
      logger.info('   2. Give "Editor" permissions');
      logger.info('   3. Test the connection using the test script');
    } else {
      logger.warn('⚠️  Google Drive service not configured - missing environment variables');
    }
  }

  /**
   * Test connection and folder access
   * @returns {Object} - Test result
   */
  async testConnection() {
    // Try to initialize if not already initialized
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.initialized) {
      return {
        success: false,
        message: 'Google Drive service not initialized',
        suggestion: 'Check environment variables configuration'
      };
    }

    try {
      logger.info('🧪 Testing Google Drive connection...');
      
      // Try to list files in the folder
      const response = await this.drive.files.list({
        q: `'${this.FOLDER_ID}' in parents`,
        pageSize: 1,
        fields: 'files(id, name)'
      });

      logger.info('✅ Connection successful!');
      logger.info(`📁 Folder accessible with ${response.data.files.length} files found`);
      
      return {
        success: true,
        message: 'Connection successful',
        filesCount: response.data.files.length
      };

    } catch (error) {
      logger.error('❌ Connection failed: ' + error.message);
      
      if (error.message.includes('not found')) {
        logger.error('🚨 Folder not found or not shared with service account');
        logger.error('📧 Please share the folder with: ' + this.credentials.client_email);
      }
      
      return {
        success: false,
        message: error.message,
        suggestion: 'Ensure the folder is shared with the service account'
      };
    }
  }

  /**
   * Upload file to Google Drive
   * @param {Object} file - File object from multer
   * @param {string} fileName - Name for the file in Google Drive
   * @returns {Object} - Upload result with file ID and view link
   */
  async uploadFile(file, fileName) {
    // Try to initialize if not already initialized
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.initialized) {
      throw new Error('Google Drive service not properly configured. Please check environment variables.');
    }

    try {
      logger.info(`Starting upload to Google Drive: ${fileName}`);

      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path)
      };

      const fileMetadata = {
        name: fileName,
        parents: this.FOLDER_ID ? [this.FOLDER_ID] : undefined
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
      });

      const fileId = response.data.id;

      // Make the file publicly viewable
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      // Generate the viewable link
      const viewLink = `https://drive.google.com/file/d/${fileId}/view`;
      const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;

      logger.info(`File uploaded successfully to Google Drive: ${fileId}`);

      // Clean up local file
      try {
        fs.unlinkSync(file.path);
        logger.info(`Local file cleaned up: ${file.path}`);
      } catch (cleanupError) {
        logger.warn(`Failed to cleanup local file: ${cleanupError.message}`);
      }

      return {
        success: true,
        fileId: fileId,
        viewLink: viewLink,
        directLink: directLink,
        fileName: fileName
      };

    } catch (error) {
      logger.error(`Error uploading file to Google Drive: ${error.message}`);
      
      // Clean up local file on error
      try {
        if (file && file.path) {
          fs.unlinkSync(file.path);
        }
      } catch (cleanupError) {
        logger.warn(`Failed to cleanup local file on error: ${cleanupError.message}`);
      }

      throw new Error(`Google Drive upload failed: ${error.message}`);
    }
  }

  /**
   * Delete file from Google Drive
   * @param {string} fileId - Google Drive file ID
   * @returns {boolean} - Success status
   */
  async deleteFile(fileId) {
    // Try to initialize if not already initialized
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.initialized) {
      logger.error('Google Drive service not initialized for file deletion');
      return false;
    }

    try {
      await this.drive.files.delete({
        fileId: fileId
      });
      
      logger.info(`File deleted from Google Drive: ${fileId}`);
      return true;
    } catch (error) {
      logger.error(`Error deleting file from Google Drive: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if service is properly configured
   * @returns {boolean} - Configuration status
   */
  isConfigured() {
    // Try to initialize if not already initialized
    if (!this.initialized) {
      this.initialize();
    }
    
    if (!this.initialized) {
      logger.warn('Google Drive service is not properly configured. Missing service account credentials.');
      if (this.credentials) {
        logger.debug('Required fields check:', {
          hasClientEmail: !!this.credentials.client_email,
          hasPrivateKey: !!this.credentials.private_key,
          hasFolderId: !!this.FOLDER_ID,
          hasProjectId: !!this.credentials.project_id,
          hasPrivateKeyId: !!this.credentials.private_key_id,
          hasClientId: !!this.credentials.client_id
        });
      }
      return false;
    }
    
    logger.info('Google Drive service is properly configured with Service Account credentials.');
    logger.info('⚠️  IMPORTANT: Ensure the target folder is shared with the service account!');
    return true;
  }
}

export default new GoogleDriveService(); 