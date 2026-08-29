import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/hanny-landing-react/",
  plugins: [react()],
});
