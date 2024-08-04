/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: [
			{
				find: "@",
				replacement: __dirname,
			},
		],
	},
	build: {
		rollupOptions: {
			input: {
				// TODO: popup 추가
				"content-script": resolve(
					__dirname,
					"src/scripts/content-scripts/content-script.ts",
				),
				"service-worker": resolve(
					__dirname,
					"src/scripts/background/service-worker.ts",
				),
			},
			output: {
				dir: "extension/scripts",
				entryFileNames: "[name].js",
			},
		},
	},
});
