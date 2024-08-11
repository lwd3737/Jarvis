/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
const path = require("path");

const ifProd = (on) => {
	if (process.env.NODE_ENV === "production") {
		on();
	}
};

const ifDev = (on) => {
	if (process.env.NODE_ENV === "development") {
		on();
	}
};

const nextConfig = () => {
	const config = {
		// output: "export",
		images: {
			unoptimized: true,
		},
		webpack: (config, { isServer }) => {
			if (!isServer) {
				ifProd(() => {
					config.output.publicPath = "/next/";
				});
			}
			return config;
		},

		experimental: {
			instrumentationHook: true,
		},
	};

	const envFile = process.env.ENV_FILE;
	if (envFile) {
		const envFilePath = path.resolve(__dirname, envFile);
		const env = dotenv.config({ path: envFilePath }).parsed;

		config.env = env;
	}

	return config;
};

module.exports = nextConfig;
