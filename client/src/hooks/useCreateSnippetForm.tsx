import { SnippetFormType, createSnippetSchema } from "@/helpers/createSnippetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "./useGlobalContext";
import { User } from "@/types/user";
import snippetAPI from '@/services/snippets'
import { type Snippet as SnippetType } from "@/types/snippet";
import data from '@/data/users.json'

export function useCreateSnippetForm() {
  const { userIsLogged, getToken } = useGlobalContext()
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
  const [users, setUsers] = useState<{ available: User[], selected: User[] }>({ available: data, selected: [] })

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
      data.sharedWith = users.selected.map(user => { return { id: user.id } })
    }
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
    users
  }
}