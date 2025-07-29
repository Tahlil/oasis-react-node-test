import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import vite from "vite-plugin-reactjs-refresh";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), vite()],
});
