import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config(); //.env can be 

export default defineConfig({
  plugins: [react()],
  define: {
    "import.eta.env.VITE_BACKEND_URL": JSON.stringify(process.env.VITE_BACKEND_URL),
  },
});
