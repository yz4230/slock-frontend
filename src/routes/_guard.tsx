import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";
import { fetchClient } from "@/lib/api";
import { authStore } from "@/store/auth";

export const Route = createFileRoute("/_guard")({
	component: RouteComponent,
	loader: async () => {
		if (authStore.state.token) {
			const res = await fetchClient.GET("/me");
			if (res.data) {
				authStore.setState((prev) => ({ ...prev, user: res.data }));
				return res.data;
			}
		}
		throw redirect({ to: "/login" });
	},
	pendingComponent: () => (
		<div className="h-dvh w-full grid place-items-center">
			<LoaderCircleIcon className="size-12 animate-spin" />
		</div>
	),
});

function RouteComponent() {
	return <Outlet />;
}
