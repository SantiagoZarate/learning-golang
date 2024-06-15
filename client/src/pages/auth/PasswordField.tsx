import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

interface Props extends ComponentProps<'input'> {
  description: string,
  control: any
}

export function PasswordField(args: Props) {
  return (
    <FormField
      control={args.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input {...field} {...args} type="password" />
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
