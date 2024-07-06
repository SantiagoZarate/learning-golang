import { FormSectionHeader } from "@/components/FormSectionHeader";
import { SendIcon } from "@/components/icons/SendIcon";
import { PublicTag } from "@/components/snippet/PublicTag";
import { Button } from "@/components/ui/button";
import { useCreateSnippetForm } from "@/hooks/useCreateSnippetForm";
import { FormProvider } from "react-hook-form";
import { HoverFormSaver } from "./HoverFormSaver";
import { SnippetContentField } from "./createSnippetForm/SnippetContentField";
import { ExpiresDayField } from "./createSnippetForm/ExpiresDayField";
import { PeopleSelectedList } from "./createSnippetForm/PeopleSelectedList";
import { SnippetTitleField } from "./createSnippetForm/SnippetTitleField";
import { PeopleList } from "./createSnippetForm/peopleList";
import { useSession } from "@/hooks/useSession";
import { useUsers } from "@/hooks/useUsers";

export function SnippetForm() {
  const { form, decrementExpireDay, handleSubmit, incrementExpireDay, isPending } = useCreateSnippetForm()
  const { addSharedUser, removeSharedUser, usersIsLoading, users, resetUsersSelected } = useUsers()
  const { userIsLogged } = useSession()

  return (
    <section className="z-20 flex flex-col gap-4 items-center justify-center">
      {!userIsLogged && <HoverFormSaver />}
      <article className="w-full flex flex-col gap-4">
        <FormSectionHeader
          icon={<SendIcon />}
          title="Create a new snippetbox."
          description="Up to 140 chars!" />
        <FormProvider {...form}>
          <form
            aria-disabled={isPending}
            data-testid="snippet-form"
            onSubmit={form.handleSubmit((data) => handleSubmit(
              {
                ...data,
                sharedWith: users.selected.map(u => { return u.id })
              }, resetUsersSelected))}
            className="focus-within:scale-[103%] focus-within:shadow-xl hover:shadow-xl hover:scale-[103%] transition-all duration-300 relative w-full space-y-2 mx-auto p-2 border border-border bg-card-foreground rounded-xl">
            <SnippetTitleField />
            <SnippetContentField />
            <footer className="flex justify-between items-center">
              {
                users.selected.length < 1
                  ? <PublicTag />
                  : <PeopleSelectedList
                    onRemoveUser={removeSharedUser}
                    usersSelected={users.selected} />
              }
              <ExpiresDayField onDecrementDay={decrementExpireDay} onIncrementDay={incrementExpireDay} />
            </footer>
            <Button
              data-testid="snippet-form-button"
              disabled={isPending}
              variant={"primary"}>
              {isPending ? "sending" : "post"}
            </Button>
          </form>
        </FormProvider>
      </article>
      {
        usersIsLoading
          ? <p className="animate-pulse p-4">Loading users...</p>
          :
          <PeopleList
            amountUsersSelected={users.selected.length}
            onSelectUser={addSharedUser}
            users={users.available} />
      }
    </section >
  )
}
