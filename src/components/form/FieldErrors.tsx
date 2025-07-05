import { uniq } from "es-toolkit";
import { useId, useMemo } from "react";
import { useFieldContext } from "@/lib/form";

export default function FieldErrors() {
	const id = useId();
	const field = useFieldContext();
	const errors = useMemo(
		() => uniq(field.state.meta.errors).map(String),
		[field.state.meta.errors],
	);

	if (errors.length === 0) return null;

	return (
		<div className="flex flex-col gap-1">
			{errors.map((error) => (
				<span
					key={`${id}-error-${error}`}
					className="text-red-500 text-sm font-bold"
				>
					{error}
				</span>
			))}
		</div>
	);
}
