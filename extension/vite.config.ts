/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, "src"),
			},
			{
				find: "@images",
				replacement: resolve(__dirname, "public/images"),
			},
		],
	},
	build: {
		rollupOptions: {
			input: {
				"content-script": resolve(
					__dirname,
					"src/scripts/content-scripts/index.ts",
				),
				"service-worker": resolve(
					__dirname,
					"src/scripts/background/service-worker.ts",
				),
			},
			output: [
				{
					dir: "extension/scripts",
					entryFileNames: "[name].js",
				},
			],
		},
	},
});
