import { formatDistanceToNow } from "date-fns";

export function getTimeUntilExpiration(expirationDate: Date) {
  const expires = new Date(expirationDate);
  return formatDistanceToNow(expires, { addSuffix: true });
}