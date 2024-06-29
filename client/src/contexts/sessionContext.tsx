import { clearUserCredentials, retrieveUserCredentials, storeUserCredentials } from '@/helpers/localStorage';
import { LoginResponseApi, UserCredentials } from '@/hooks/useSession';
import { PropsWithChildren, createContext } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

interface Props {
  userIsLogged: boolean,
  logoutUser: () => void,
  loginUser: (token: LoginResponseApi) => void,
  getToken: () => any
  userCredentials: UserCredentials | null
}

export const sessionContext = createContext<Props | null>(null);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [cookies, _setCookies, removeCookie] = useCookies(["access_token"]);
  const redirect = useNavigate()

  const loginUser = ({ role, username, pfp }: LoginResponseApi) => {
    // setCookies("access_token", token)
    clearUserCredentials()
    storeUserCredentials({ username, role, pfp })
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
    const values = userCredentials
    return values !== null
  }

  return (
    <sessionContext.Provider value={{
      userIsLogged: userIsLogged(),
      loginUser,
      logoutUser,
      getToken,
      userCredentials
    }}>
      {children}
    </sessionContext.Provider>
  )
} 