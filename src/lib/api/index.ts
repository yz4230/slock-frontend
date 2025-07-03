import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./v1";

export const fetchClient = createFetchClient<paths>({
  baseUrl: "https://example.com/v1/",
});

export const $api = createClient(fetchClient);
