import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The PHP API runs in XAMPP Apache, not in Vite.
    // Any request to /webwanderer/... is forwarded to
    // http://localhost/wss_hotel_ICJ/webwanderer/...
    // (In the real exam the folder is in the server root: change target to 'http://localhost'
    //  and remove the rewrite.)
    proxy: {
      '/webwanderer': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: path => '/wss_hotel_ICJ' + path,
      },
    },
  },
})
