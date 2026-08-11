interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: Props) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="page-title">{title}</h1>

        {description && <p className="page-subtitle mt-1">{description}</p>}
      </div>

      {action}
    </div>
  );
}
