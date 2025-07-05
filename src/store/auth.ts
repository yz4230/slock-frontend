import { Store } from "@tanstack/react-store";
import type { components } from "@/lib/api/v1";

type User = components["schemas"]["User"];

type AuthStore = {
	user: User | null;
	token: string | null;
};

export const authStore = new Store<AuthStore>({
	user: null,
	token: null,
});

const TOKEN_KEY = "token";

authStore.subscribe(({ currentVal }) => {
	if (currentVal.token) localStorage.setItem(TOKEN_KEY, currentVal.token);
	else localStorage.removeItem(TOKEN_KEY);
});

const token = localStorage.getItem(TOKEN_KEY);
if (token) authStore.setState((prev) => ({ ...prev, token }));
