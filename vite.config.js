import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // ✅ Import React plugin

export default defineConfig({
  plugins: [react()], // ✅ Use the React plugin
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
