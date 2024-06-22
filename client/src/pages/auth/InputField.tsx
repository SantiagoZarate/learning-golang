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
}

export function InputField(args: Props) {
  return (
    <FormField
      control={args.control}
      name={args.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{args.label}</FormLabel>
          <FormControl>
            <Input {...field} {...args} />
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
