import { userStore } from "@/store/user";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import config from "../config";
import type { paths } from "./v1";

export const fetchClient = createFetchClient<paths>({
	baseUrl: config.API_BASE_URL,
});

fetchClient.use({
	onRequest({ request }) {
		if (userStore.state) {
			const token = userStore.state.token;
			request.headers.set("Authorization", `Bearer ${token}`);
		}
	},
});

export const $api = createClient(fetchClient);
