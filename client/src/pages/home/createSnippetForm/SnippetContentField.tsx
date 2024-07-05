import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"

export function SnippetContentField() {
  const form = useFormContext()

  useEffect(() => {
    console.log("EL estado del form is submitting cambio")
  }, [form.formState.isSubmitting])

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <textarea
              disabled={form.formState.isSubmitting}
              data-testid="snippet-content-field"
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
