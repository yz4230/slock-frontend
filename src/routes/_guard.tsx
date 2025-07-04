import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { $api } from "@/lib/api";

export const Route = createFileRoute("/_guard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, error } = useQuery({
		...$api.queryOptions("get", "/me"),
		staleTime: Number.POSITIVE_INFINITY,
		retry: false,
	});

	if (error) return <Navigate to="/login" replace />;

	if (!data) return <div>Loading...</div>;

	return <Outlet />;
}
