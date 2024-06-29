import { SnippetFormType, createSnippetSchema } from "@/helpers/createSnippetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserDTO } from "@/types/snippet";
import userAPI from '@/services/users'
import { useSession } from "./useSession";
import { useSnippets } from "./useSnippets";

interface UsersState {
  selected: UserDTO[],
  available: UserDTO[]
}

export function useCreateSnippetForm() {
  const { userIsLogged, userCredentials } = useSession()
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      content: "",
      title: "",
      expires: 1,
      sharedWith: []
    }
  })
  const { createSnippet } = useSnippets()
  const usersData = useQuery<UserDTO[]>({ queryKey: ["users"], queryFn: userAPI.getAll })
  const [users, setUsers] = useState<UsersState>({ available: [], selected: [] })

  useEffect(() => {
    if (usersData) {
      setUsers((prevState) => ({ ...prevState, available: usersData.data! }));
    }
  }, [usersData.data]);

  const incrementExpireDay = () => {
    const currentValue = form.getValues("expires")
    form.setValue("expires", Number(currentValue) + 1)
  }

  const decrementExpireDay = () => {
    const currentValue = form.getValues("expires")
    if (currentValue === undefined) {
      form.setValue("expires", 1)
      return
    }
    if (currentValue <= 1) {
      return
    }
    form.setValue("expires", Number(currentValue) - 1)
  }

  const addSharedUser = (id: number) => {
    const user = users.available.find(u => u.id === id)
    if (user === undefined) {
      return
    }

    setUsers((prevState) => {
      return {
        available: prevState.available.filter(user => user.id !== id),
        selected: [...prevState.selected, user]
      }
    })
  }

  const removeSharedUser = (id: number) => {
    const user = users.selected.find(user => user.id === id)
    if (user === undefined) {
      return
    }

    setUsers((prevState) => {
      return {
        available: [...prevState.available, user],
        selected: prevState.selected.filter(user => user.id !== id)
      }
    })
  }

  const handleSubmit = (data: SnippetFormType) => {
    if (users.selected.length > 1) {
      data.sharedWith = users.selected.map(user => { return user.id })
    }
    data.author = userCredentials.username
    console.log(data)
    createSnippet.mutateAsync(data).then(() => {
      form.reset()
      setUsers((prevState) => ({ available: prevState.available.concat(prevState.selected), selected: [] }))
    })
  }

  return {
    userIsLogged,
    handleSubmit,
    removeSharedUser,
    addSharedUser,
    decrementExpireDay,
    incrementExpireDay,
    isPending: createSnippet.isPending,
    form,
    users,
    usersIsLoading: usersData.isLoading
  }
}