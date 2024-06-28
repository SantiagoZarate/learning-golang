import { PropsWithChildren, createContext, useEffect, useState } from 'react';

interface Props {
  isDarkTheme: boolean,
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export const themeContext = createContext<Props | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem("theme") === "dark")

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <themeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </themeContext.Provider>
  )
}