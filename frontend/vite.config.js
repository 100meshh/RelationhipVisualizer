// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwind from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwind()]
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// Load environment variables
const backendUrl = process.env.VITE_API_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // local backend for dev
        changeOrigin: true,
      },
    },
  },
  define: {
    __API_URL__: JSON.stringify(backendUrl),
  },
})
