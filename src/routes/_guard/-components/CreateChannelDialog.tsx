import { useQueryClient } from "@tanstack/react-query";
import {
	type FormEvent,
	type PropsWithChildren,
	useCallback,
	useState,
} from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { $api } from "@/lib/api";
import { useAppForm } from "@/lib/form";

export default function CreateChannelDialog(props: PropsWithChildren) {
	const mutation = $api.useMutation("post", "/create-channel");
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const form = useAppForm({
		defaultValues: {
			name: "",
			description: "",
		},
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync({
				body: { channel: { ...value, isDirect: false } },
			});
			await queryClient.invalidateQueries({
				queryKey: $api.queryOptions("get", "/list-channels").queryKey,
			});
			setOpen(false);
		},
	});

	const handleAnimationEnd = useCallback(
		() => open && form.reset(),
		[open, form],
	);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			e.stopPropagation();
			form.handleSubmit();
		},
		[form],
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent onAnimationEnd={handleAnimationEnd}>
				<DialogHeader>
					<DialogTitle>Create a channel</DialogTitle>
					<DialogDescription className="hidden">
						Channels are where your team communicates. They’re best when
					</DialogDescription>
				</DialogHeader>
				<form.AppForm>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						<form.AppField name="name">
							{(field) => <field.TextField label="Name" />}
						</form.AppField>
						<form.AppField name="description">
							{(field) => <field.TextField label="Description" />}
						</form.AppField>
						<form.SubmitButton>Create Channel</form.SubmitButton>
					</form>
				</form.AppForm>
			</DialogContent>
		</Dialog>
	);
}
