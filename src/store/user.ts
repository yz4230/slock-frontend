import type { components } from "@/lib/api/v1";
import { Store } from "@tanstack/react-store";

type User = components["schemas"]["User"];

type UserStore = {
	user: User;
	token: string;
};

export const userStore = new Store<UserStore | null>(null);
