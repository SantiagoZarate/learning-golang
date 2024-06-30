import { Text } from "@/components/text/Text";
import { ReactNode } from "react";

interface Props {
  name: string
  action: ReactNode,
}

export function ProfileSettingSection({ action, name }: Props) {
  return (
    <article className="p-6 flex items-center justify-between">
      <Text intent={"regular"}>
        {name}
      </Text>
      {action}
    </article>
  )
}



