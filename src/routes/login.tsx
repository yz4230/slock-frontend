import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/lib/api";
import { userStore } from "@/store/user";
import { useForm } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { LoaderCircleIcon } from "lucide-react";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const mutation = $api.useMutation("post", "/login");

	const form = useForm({
		defaultValues: {
			name: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			const data = await mutation.mutateAsync({ body: value });
			userStore.setState({
				user: data.user,
				token: data.token,
			});
		},
	});

	return (
		<div className="grid place-items-center min-h-svh bg-slate-500">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="flex flex-col gap-4 max-w-sm w-full p-6 rounded-lg shadow-md bg-white"
			>
				<h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
				<div className="flex flex-col gap-1">
					<Label htmlFor="name">Username</Label>
					<form.Field name="name">
						{(field) => (
							<Input
								type="name"
								value={field.state.value}
								onChange={(e) => field.setValue(e.target.value)}
							/>
						)}
					</form.Field>
				</div>
				<div className="flex flex-col gap-1">
					<Label htmlFor="password">Password</Label>
					<form.Field name="password">
						{(field) => (
							<Input
								type="password"
								value={field.state.value}
								onChange={(e) => field.setValue(e.target.value)}
							/>
						)}
					</form.Field>
				</div>
				<div className="flex items-center gap-2 justify-center">
					<span>Don't have an account?</span>
					<Link to="/register" className="text-blue-500 hover:underline">
						Register
					</Link>
				</div>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							className="bg-black text-white p-2 rounded-md"
							disabled={!canSubmit}
						>
							{isSubmitting && <LoaderCircleIcon className="animate-spin" />}
							<span>Login</span>
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
