import { PlusIcon } from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const snippetSchema = z.object({
  title: z.string(),
  content: z.string()
})

type SnippetFormType = z.infer<typeof snippetSchema>

export function SnippetForm() {
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(snippetSchema)
  })

  const onSubmit = (data: SnippetFormType) => {
    console.log(data)
  }

  return (
    <section className="flex-1 flex flex-col items-center justify-center divide-y">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2 mx-auto p-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="border-none bg-muted rounded-lg" placeholder="howdy!" />
                </FormControl>
                <FormDescription>
                  Your new snippet
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border-none bg-muted rounded-lg min-h-20"
                    placeholder="it all started when i was 3 years old.." />
                </FormControl>
                <FormDescription>
                  Your new snippet
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Toaster />
          <Button>post</Button>
        </form>
      </Form>
      <article className="w-full flex flex-col gap-4 p-4">
        <h2>Choose who you want it to see it</h2>
        <ul className="flex flex-wrap gap-8 justify-center">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <li key={n} className="cursor-pointer aspect-square hover:-translate-y-1 transition w-16 rounded-full overflow-hidden border-border">
                <img className="w-full h-full bg-muted object-center" src="" alt="" />
              </li>
            ))
          }
          <li className="cursor-pointer aspect-square w-16 rounded-full flex items-center hover:-translate-y-1 transition justify-center overflow-hidden border-border bg-border object-center">
            <PlusIcon />
          </li>
        </ul>
      </article>
    </section>
  )
}
