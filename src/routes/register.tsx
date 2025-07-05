import { createFileRoute, Link } from "@tanstack/react-router";
import { $api } from "@/lib/api";
import { useAppForm } from "@/lib/form";
import { authStore } from "@/store/auth";

export const Route = createFileRoute("/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const mutation = $api.useMutation("post", "/register");

	const form = useAppForm({
		defaultValues: {
			name: "",
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: ({ value }) => {
				if (value.password !== value.confirmPassword) {
					return {
						fields: {
							confirmPassword: "Passwords do not match",
						},
					};
				}
			},
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
					<h1 className="text-3xl font-bold text-center">Create an Account</h1>
					<form.AppField name="name">
						{(field) => (
							<field.TextField
								label="Username"
								inputProps={{ autoComplete: "username", required: true }}
							/>
						)}
					</form.AppField>
					<form.AppField name="displayName">
						{(field) => (
							<field.TextField
								label="Display Name"
								inputProps={{ required: true }}
							/>
						)}
					</form.AppField>
					<form.AppField name="email">
						{(field) => (
							<field.TextField label="Email" inputProps={{ required: true }} />
						)}
					</form.AppField>
					<form.AppField name="password">
						{(field) => (
							<field.PasswordField
								label="Password"
								inputProps={{ autoComplete: "new-password", required: true }}
							/>
						)}
					</form.AppField>
					<form.AppField name="confirmPassword">
						{(field) => (
							<field.PasswordField
								label="Confirm Password"
								inputProps={{ autoComplete: "new-password", required: true }}
							/>
						)}
					</form.AppField>
					<div className="flex items-center gap-2 justify-center">
						<span>Already have an account?</span>
						<Link to="/login" className="text-blue-500 hover:underline">
							Login
						</Link>
					</div>
					<form.SubmitButton>Register</form.SubmitButton>
				</form>
			</form.AppForm>
		</div>
	);
}
