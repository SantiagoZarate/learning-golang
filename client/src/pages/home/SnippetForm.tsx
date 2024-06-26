import { FormSectionHeader } from "@/components/FormSectionHeader";
import { SendIcon } from "@/components/icons/SendIcon";
import { PublicTag } from "@/components/snippet/PublicTag";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useCreateSnippetForm } from "@/hooks/useCreateSnippetForm";
import { ExpireDayButton } from "./ExpireDayButton";
import { HoverFormSaver } from "./HoverFormSaver";
import { PeopleSelectedList } from "./createSnippetForm/PeopleSelectedList";
import { PeopleList } from "./createSnippetForm/peopleList";

export function SnippetForm() {
  const { form, users, addSharedUser, decrementExpireDay, handleSubmit, incrementExpireDay, isPending, removeSharedUser, userIsLogged } = useCreateSnippetForm()

  return (
    <section className="fixed w-1/4 flex flex-col gap-4 items-center justify-center">
      {!userIsLogged && <HoverFormSaver />}
      <article className="w-full flex flex-col gap-4">
        <FormSectionHeader
          icon={<SendIcon />}
          title="Create a new snippetbox."
          description="Up to 140 chars!" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="focus-within:scale-[103%] focus-within:shadow-xl hover:shadow-xl hover:scale-[103%] transition-all duration-300 relative w-full space-y-2 mx-auto p-2 border border-border bg-card-foreground rounded-xl">
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
            <footer className="flex justify-between items-center ">
              {
                users.selected.length < 1
                  ? <PublicTag />
                  : <PeopleSelectedList
                    onRemoveUser={removeSharedUser}
                    usersSelected={users.selected} />
              }
              <label htmlFor="expires" className="flex flex-col items-center gap-1">
                <p className="text-xs text-secondary">expires in:</p>
                <div className="flex bg-muted rounded-xl overflow-hidden">
                  <ExpireDayButton onClick={decrementExpireDay}>-</ExpireDayButton>
                  <input
                    value={form.watch("expires")}
                    className="max-w-10 bg-input p-0 m-0 w-full text-center"
                    type="number"
                    {...form.register("expires")} />
                  <ExpireDayButton onClick={incrementExpireDay}>+</ExpireDayButton>
                </div>
              </label>
            </footer>
            <Button
              disabled={isPending}
              className="uppercase w-fit rounded-full font-bold bg-card text-secondary min-w-24">
              {
                isPending
                  ? "sending"
                  : "post"
              }</Button>
          </form>
        </Form>
        <Toaster />
      </article>
      <PeopleList
        onSelectUser={addSharedUser}
        users={users.available} />
    </section>
  )
}
