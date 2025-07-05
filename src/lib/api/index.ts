import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { authStore } from "@/store/auth";
import config from "../config";
import type { paths } from "./v1";

export const fetchClient = createFetchClient<paths>({
	baseUrl: config.API_BASE_URL,
});

fetchClient.use({
	onRequest({ request }) {
		if (authStore.state.token) {
			const value = `Bearer ${authStore.state.token}`;
			request.headers.set("Authorization", value);
		}
	},
});

export const $api = createClient(fetchClient);
