import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function SnippetTitleField() {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className="border-none bg-input rounded-none rounded-tl-xl rounded-tr-xl "
              placeholder="Howdy" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
