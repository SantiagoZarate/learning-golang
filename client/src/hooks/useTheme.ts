import { themeContext } from "@/contexts/themeContext";
import { useContext } from "react";

export function useTheme() {
  const values = useContext(themeContext)

  if (values === null) {
    throw new Error("useTheme hook should be used within ThemeProvider component")
  }

  const { isDarkTheme, setIsDarkTheme } = values

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

  return {
    toggleTheme,
    isDarkTheme
  }
}