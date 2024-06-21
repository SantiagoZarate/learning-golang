interface Props {
  icon: JSX.Element,
  title: string,
  description: string
}

export function FormSectionHeader({ description, icon, title }: Props) {
  return (
    <header className="flex items-center divide-x border-b border-t">
      <span className="p-6">
        {icon}
      </span>
      <span className="p-2 flex flex-col gap-1">
        <h2 className="text-sm">{title}</h2>
        <p className="text-xs text-secondary">{description}</p>
      </span>
    </header>
  )
}
