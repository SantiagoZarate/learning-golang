import { useTheme } from '@/hooks/useTheme';
import { PropsWithChildren, createContext } from 'react';

interface Props {
  isDarkTheme: boolean,
  toggleTheme: () => void,
}

export const themeContext = createContext<Props | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const { isDarkTheme, toggleTheme } = useTheme()

  return (
    <themeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  )
}