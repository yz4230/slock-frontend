import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		tanstackRouter({ autoCodeSplitting: true }),
		viteReact({ babel: { plugins: ["babel-plugin-react-compiler"] } }),
		tailwindcss(),
		tsconfigPaths(),
	],
});
