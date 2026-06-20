import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

export default defineConfig({
    plugins: [react()],
    css: {
        devSourcemap: true,
    },
    resolve: {
        alias: {
            // Specific overrides must come BEFORE the catch-all "@" alias
            // so Vite's prefix matching picks them up first.
            "@/images": path.resolve(__dirname, "./src/assets/images"),
            // Catch-all: resolves all remaining @/* imports to src/
            "@": path.resolve(__dirname, "./src"),
            // Font alias used in SCSS
            "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
        },
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    server: {
        allowedHosts: true,
    },
});