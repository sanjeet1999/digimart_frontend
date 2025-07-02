// Configuration settings for the application
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000',
  },
  production: {
    API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  }
};

const environment = import.meta.env.MODE || 'development';

export default config[environment]; 