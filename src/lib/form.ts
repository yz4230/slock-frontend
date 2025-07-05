import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import PasswordField from "@/components/form/PasswordField";
import SubmitButton from "@/components/form/SubmitButton";
import TextField from "@/components/form/TextField";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: { TextField, PasswordField },
	formComponents: { SubmitButton },
});
