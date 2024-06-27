import { clearUserCredentials, retrieveUserCredentials, storeUserCredentials } from '@/helpers/localStorage';
import { LoginResponseApi, UserCredentials } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { PropsWithChildren, createContext } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

interface Props {
  userIsLogged: boolean,
  logoutUser: () => void,
  loginUser: (token: LoginResponseApi) => void,
  isDarkTheme: boolean,
  toggleTheme: () => void,
  getToken: () => any
  userCredentials: UserCredentials
}

export const globalContext = createContext<Props | null>(null);

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const [cookies, _setCookies, removeCookie] = useCookies(["access_token"]);
  const { isDarkTheme, toggleTheme } = useTheme()
  const redirect = useNavigate()

  const loginUser = ({ role, username }: LoginResponseApi) => {
    // setCookies("access_token", token)
    clearUserCredentials()
    storeUserCredentials({ username, role })
  }

  const logoutUser = () => {
    clearUserCredentials()
    removeCookie("access_token")
    redirect("/")
  }

  const userCredentials = retrieveUserCredentials()

  const getToken = () => {
    return cookies["access_token"]
  }

  const userIsLogged = () => {
    const { role, username } = userCredentials
    const userCredentialsStored = role?.length > 0 && username?.length > 0
    return userCredentialsStored
  }

  return (
    <globalContext.Provider value={{
      isDarkTheme: isDarkTheme,
      toggleTheme,
      userIsLogged: userIsLogged(),
      loginUser,
      logoutUser,
      getToken,
      userCredentials
    }}>
      {children}
    </globalContext.Provider>
  )
} 