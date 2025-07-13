import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [tailwindcss(), react()],
    
    // Base URL configuration
    base: '/',
    
    // Development server configuration
    server: {
      // host: true, // Expose to all network interfaces
      host:`0.0.0.0`,
      port: 5173,
      strictPort: true,
      cors: true,
      open: true,
      // Proxy configuration if needed
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Build configuration
    build: {
      // Generate source maps for production build
      sourcemap: true,
      // Ensure proper handling of dynamic imports
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      // Optimize dependencies
      commonjsOptions: {
        include: [/node_modules/],
      },
    },

    // Optimize deps that should be pre-bundled
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  }
});
