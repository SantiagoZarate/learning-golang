import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

interface Props extends ComponentProps<'input'> {
  description: string,
  control: any
}

export function EmailField(args: Props) {
  return (
    <FormField
      control={args.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
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
