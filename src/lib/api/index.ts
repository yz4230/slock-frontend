import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import config from "../config";
import type { paths } from "./v1";

export const fetchClient = createFetchClient<paths>({
	baseUrl: config.API_BASE_URL,
});

export const $api = createClient(fetchClient);
