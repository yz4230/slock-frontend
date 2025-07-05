import { Label } from "@radix-ui/react-label";
import { invariant } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { type ComponentProps, useCallback, useId, useState } from "react";
import { useFieldContext } from "@/lib/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import FieldErrors from "./FieldErrors";

type InputType = "text" | "password";

export default function PasswordField(props: {
	label: string;
	inputProps?: ComponentProps<"input">;
}) {
	const fieldType = (props.inputProps?.type ?? "password") as InputType;
	invariant(fieldType === "password");

	const id = useId();
	const field = useFieldContext<string>();
	const [innerType, setInnerType] = useState<InputType>(fieldType);

	const toggleVisibility = useCallback(
		() => setInnerType((prev) => (prev === "password" ? "text" : "password")),
		[],
	);

	return (
		<div className="flex flex-col gap-1">
			<Label htmlFor={id}>{props.label}</Label>
			<div className="relative">
				<Input
					id={id}
					value={field.state.value}
					onChange={(e) => field.setValue(e.target.value)}
					{...props.inputProps}
					type={innerType}
				/>
				{fieldType === "password" && (
					<Button
						type="button"
						size="icon"
						variant="ghost"
						className="absolute right-0.5 top-1/2 -translate-y-1/2 size-8"
						onClick={toggleVisibility}
					>
						{innerType === "password" && <EyeIcon />}
						{innerType === "text" && <EyeOffIcon />}
					</Button>
				)}
			</div>
			<FieldErrors />
		</div>
	);
}
