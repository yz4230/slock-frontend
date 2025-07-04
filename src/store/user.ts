import { Store } from "@tanstack/react-store";
import type { components } from "@/lib/api/v1";

type User = components["schemas"]["User"];

type UserStore = {
	user: User;
	token: string;
};

export const userStore = new Store<UserStore | null>(null);
