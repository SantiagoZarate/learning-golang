import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"

export function ContentField() {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <textarea
              placeholder="it all started when i was 3 years old.."
              className="w-full px-3 py-2  border-none bg-input rounded-none rounded-bl-xl rounded-br-xl min-h-20 text-left"
              id="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
