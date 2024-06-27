import { SnippetFormType, createSnippetSchema } from "@/helpers/createSnippetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "./useGlobalContext";
import snippetAPI from '@/services/snippets'
import { UserDTO, type Snippet as SnippetType } from "@/types/snippet";
import userAPI from '@/services/users'

interface UsersState {
  selected: UserDTO[],
  available: UserDTO[]
}

export function useCreateSnippetForm() {
  const { userIsLogged, getToken, userCredentials } = useGlobalContext()
  const form = useForm<SnippetFormType>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: {
      content: "",
      title: "",
      expires: 1,
      sharedWith: []
    }
  })
  const queryClient = useQueryClient()
  const usersData = useQuery<UserDTO[]>({ queryKey: ["users"], queryFn: userAPI.getAll })
  const [users, setUsers] = useState<UsersState>({ available: [], selected: [] })

  useEffect(() => {
    if (usersData) {
      setUsers((prevState) => ({ ...prevState, available: usersData.data! }));
    }
  }, [usersData.data]);

  const { isPending, mutate } = useMutation({
    mutationKey: ["snippets"],
    mutationFn: (data: SnippetFormType) => snippetAPI.createSnippet(data, getToken()),
    onMutate: async (newSnippet: SnippetFormType) => {
      await queryClient.cancelQueries({ queryKey: ["snippets"] })
      const previousSnippets = queryClient.getQueryData(["snippets"])
      queryClient.setQueryData(["snippets"], (oldData: SnippetType[]) => {
        if (oldData === null) {
          return [newSnippet]
        }
        return [
          {
            ...newSnippet,
            id: oldData.length + 1,
            isRecentlyAdded: true
          },
          ...oldData,
        ]
      })
      return { previousSnippets }
    },
    onError: (error, _, context) => {
      console.log(error)
      if (context?.previousSnippets !== undefined) {
        queryClient.setQueryData(["snippets"], context.previousSnippets)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["snippets"]
      })
    },
    onSuccess: () => {
      form.reset()
      setUsers((prevState) => {
        return {
          available: prevState.available.concat(prevState.selected),
          selected: []
        }
      })
    }
  });

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
    mutate(data)
  }

  return {
    userIsLogged,
    handleSubmit,
    removeSharedUser,
    addSharedUser,
    decrementExpireDay,
    incrementExpireDay,
    isPending,
    form,
    users,
    usersIsLoading: usersData.isLoading
  }
}