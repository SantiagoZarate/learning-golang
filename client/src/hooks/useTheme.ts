import { useState, useEffect } from "react";

export function useTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem("theme") === "dark")

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

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