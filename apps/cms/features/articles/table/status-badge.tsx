import { Badge } from "@/components/ui/badge";

import { ArticleStatus } from "@/types/article";

interface Props {
  status: ArticleStatus;
}

const statusConfig: Record<
  ArticleStatus,
  {
    label: string;
    className?: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  Draft: {
    label: "Draft",
    variant: "secondary",
  },

  Review: {
    label: "Review",
    className: "bg-blue-600 hover:bg-blue-600 text-white",
  },

  Scheduled: {
    label: "Scheduled",
    className: "bg-amber-500 hover:bg-amber-500 text-white",
  },

  Published: {
    label: "Published",
    className: "bg-green-600 hover:bg-green-600 text-white",
  },

  Archived: {
    label: "Archived",
    variant: "outline",
  },
};

export function StatusBadge({ status }: Props) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
