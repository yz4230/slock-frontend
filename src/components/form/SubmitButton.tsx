import { LoaderCircleIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useFormContext } from "@/lib/form";
import { Button } from "../ui/button";

export default function SubmitButton(props: PropsWithChildren) {
	const form = useFormContext();

	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
			{([canSubmit, isSubmitting]) => (
				<Button
					type="submit"
					className="bg-black text-white p-2 rounded-md"
					disabled={!canSubmit}
				>
					{isSubmitting && <LoaderCircleIcon className="animate-spin" />}
					{props.children}
				</Button>
			)}
		</form.Subscribe>
	);
}
