import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "@/lib/api";
import { useAppForm } from "@/lib/form";
import { authStore } from "@/store/auth";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const mutation = $api.useMutation("post", "/login");

	const form = useAppForm({
		defaultValues: {
			name: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			const data = await mutation.mutateAsync({ body: value });
			authStore.setState({
				user: data.user,
				token: data.token,
			});
		},
	});

	return (
		<div className="grid place-items-center min-h-svh bg-slate-500">
			<form.AppForm>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="flex flex-col gap-4 max-w-sm w-full p-6 rounded-lg shadow-md bg-white"
				>
					<h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
					<form.AppField name="name">
						{(field) => (
							<field.TextField
								label="Username"
								inputProps={{ required: true, autoComplete: "username" }}
							/>
						)}
					</form.AppField>
					<form.AppField name="password">
						{(field) => (
							<field.PasswordField
								label="Password"
								inputProps={{
									required: true,
									autoComplete: "current-password",
								}}
							/>
						)}
					</form.AppField>
					<div className="flex items-center gap-2 justify-center">
						<span>Don't have an account?</span>
						<Link to="/register" className="text-blue-500 hover:underline">
							Register
						</Link>
					</div>
					<form.SubmitButton>Login</form.SubmitButton>
				</form>
			</form.AppForm>
		</div>
	);
}
