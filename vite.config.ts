/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/setupTests.js"],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id
							.toString()
							.split("node_modules/")[1]
							.split("/")[0]
							.toString();
					}
				},
			},
		},
	},
	server: {
		https: {
			key: fs.readFileSync("./.cert/key.pem"),
			cert: fs.readFileSync("./.cert/cert.pem"),
		},
	},
});
