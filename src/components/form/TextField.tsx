import { Label } from "@radix-ui/react-label";
import { type ComponentProps, useId } from "react";
import { useFieldContext } from "@/lib/form";
import { Input } from "../ui/input";
import FieldErrors from "./FieldErrors";

export default function TextField(props: {
	label: string;
	inputProps?: ComponentProps<"input">;
}) {
	const id = useId();
	const field = useFieldContext<string>();

	return (
		<div className="flex flex-col gap-1">
			<Label htmlFor={id}>{props.label}</Label>
			<Input
				id={id}
				value={field.state.value}
				onChange={(e) => field.setValue(e.target.value)}
				{...props.inputProps}
			/>
			<FieldErrors />
		</div>
	);
}
