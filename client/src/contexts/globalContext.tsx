import { PropsWithChildren, createContext } from 'react';
import { useCookies } from 'react-cookie'

interface Props {
  userIsLogged: boolean,
  logoutUser: () => void,
  loginUser: (token: string) => void
}

export const globalContext = createContext<Props | null>(null);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [cookies, setCookies] = useCookies(["access_token"]);

  const loginUser = (token: string) => {
    setCookies("access_token", token)
  }

  const logoutUser = () => {
    setCookies("access_token", null)
  }

  return (
    <globalContext.Provider value={{
      userIsLogged: cookies.access_token?.length > 0 ?? false,
      loginUser,
      logoutUser
    }}>
      {children}
    </globalContext.Provider>
  )
} 