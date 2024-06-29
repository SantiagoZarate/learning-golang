import { UserCredentials } from "@/hooks/useSession"

const USER_CREDENTIALS_KEY = "userCredentials";

export function clearUserCredentials() {
  localStorage.removeItem(USER_CREDENTIALS_KEY);
}

export function storeUserCredentials(credentials: UserCredentials) {
  localStorage.setItem(USER_CREDENTIALS_KEY, JSON.stringify(credentials));
}

export function retrieveUserCredentials(): UserCredentials | null {
  const storedCredentials = localStorage.getItem(USER_CREDENTIALS_KEY);
  if (storedCredentials) {
    return JSON.parse(storedCredentials) as UserCredentials;
  }
  return null; // Return null if no credentials are stored
}