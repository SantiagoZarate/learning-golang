import { PropsWithChildren, createContext, useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

interface Props {
  userIsLogged: boolean,
  logoutUser: () => void,
  loginUser: (token: string) => void,
  isDarkTheme: boolean,
  toggleTheme: () => void
}

export const globalContext = createContext<Props | null>(null);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem("theme") === "dark")
  const redirect = useNavigate()

  if (isDarkTheme) {
    document.documentElement.classList.add("dark")
  }

  const loginUser = (token: string) => {
    setCookies("access_token", token)
  }

  const logoutUser = () => {
    redirect("/")
    setCookies("access_token", null)
  }

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")

    if (isDarkTheme) {
      localStorage.removeItem("theme")
      setIsDarkTheme(false)
    } else {
      localStorage.setItem("theme", "dark")
      setIsDarkTheme(true)
    }
  }

  return (
    <globalContext.Provider value={{
      isDarkTheme: isDarkTheme,
      toggleTheme,
      userIsLogged: cookies.access_token?.length > 0 ?? false,
      loginUser,
      logoutUser
    }}>
      {children}
    </globalContext.Provider>
  )
} 