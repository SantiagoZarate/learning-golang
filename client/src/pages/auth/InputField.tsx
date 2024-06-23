import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormType } from "@/helpers/formSchemas";
import { ComponentProps } from "react";
import { Control } from "react-hook-form";

interface Props extends ComponentProps<'input'> {
  label: string,
  description: string,
  control: Control<RegisterFormType>
  name: keyof RegisterFormType
  icon: JSX.Element
}

export function InputField(args: Props) {
  return (
    <FormField
      control={args.control}
      name={args.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {args.icon}
            {args.label}
          </FormLabel>
          <FormControl>
            <Input {...field} {...args} className="bg-input" />
          </FormControl>
          <FormDescription>
            {args.description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
