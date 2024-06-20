import { PlusIcon } from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import users from '@/data/users.json'

const snippetSchema = z.object({
  title: z.string(),
  content: z.string()
})

type SnippetFormType = z.infer<typeof snippetSchema>

export function SnippetForm() {
  const { userIsLogged } = useGlobalContext()
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(snippetSchema)
  })

  const onSubmit = (data: SnippetFormType) => {
    console.log(data)
  }

  return (
    <section className="fixed w-1/4 flex flex-col gap-4 items-center justify-center divide-y p-4">
      {
        !userIsLogged &&
        <div className="absolute z-20 flex flex-col gap-4 transition duration-300 opacity-0 hover:opacity-100 backdrop-blur-lg inset-0 justify-center items-center">
          <p>You must log on to create a a new snippet</p>
          <Link to={"/login"}>
            <Button>
              log in
            </Button>
          </Link>
        </div>
      }
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full space-y-2 mx-auto p-2 border border-border bg-card-foreground rounded-xl">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border-none bg-input rounded-none rounded-tl-xl rounded-tr-xl "
                    placeholder="howdy!" />
                </FormControl>
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
                    className="border-none bg-input rounded-none rounded-bl-xl rounded-br-xl min-h-20 text-left"
                    placeholder="it all started when i was 3 years old.." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Toaster />
          <Button className="uppercase w-fit rounded-full font-bold bg-card text-secondary">post</Button>
        </form>
      </Form>
      <article className="w-full flex flex-col gap-4 p-4">
        <h2>Choose who you want it to see it</h2>
        <ul className="flex flex-wrap gap-8 justify-center">
          {
            users.map(n => (
              <li key={n.pfp} className="cursor-pointer aspect-square hover:-translate-y-1 transition w-16 rounded-full overflow-hidden border-border">
                <img className="w-full h-full bg-muted object-center" src={n.pfp} alt="" />
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
