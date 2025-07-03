import { object, parse, string } from "valibot";

const ConfigSchema = object({
	API_BASE_URL: string(),
});

const config = parse(ConfigSchema, {
	API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});

export default config;
