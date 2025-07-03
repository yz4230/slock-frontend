import { object, parse, string } from "valibot";

const ConfigSchema = object({
	API_BASE_URL: string(),
});

const config = parse(ConfigSchema, import.meta.env);

export default config;
