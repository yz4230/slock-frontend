import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { invariant } from "es-toolkit";
import { authStore } from "@/store/auth";

export const Route = createFileRoute("/_guard/")({
	component: App,
});

function App() {
	const user = useStore(authStore, (state) => state.user);
	invariant(user, "User must be defined in _guard route");

	return <div>Hello, {user.displayName ?? user.name}!</div>;
}
