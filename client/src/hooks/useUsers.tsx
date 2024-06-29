import { UserDTO } from "@/types/snippet";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import userAPI from '@/services/users'

interface UsersState {
  selected: UserDTO[],
  available: UserDTO[]
}

export function useUsers() {
  const usersData = useQuery<UserDTO[]>({ queryKey: ["users"], queryFn: userAPI.getAll })
  const [users, setUsers] = useState<UsersState>({ available: [], selected: [] })

  useEffect(() => {
    if (usersData) {
      setUsers((prevState) => ({ ...prevState, available: usersData.data! }));
    }
  }, [usersData.data]);

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

  const resetUsersSelected = () => {
    setUsers((prevState) => ({ available: prevState.available.concat(prevState.selected), selected: [] }))
  }

  return {
    removeSharedUser,
    addSharedUser,
    usersIsLoading: usersData.isLoading,
    users,
    resetUsersSelected
  }
}