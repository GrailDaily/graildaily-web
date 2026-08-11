import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardActions() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-6 text-lg font-semibold">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Button>New Article</Button>

          <Button variant="secondary">Upload Media</Button>

          <Button variant="outline">New Category</Button>
        </div>
      </CardContent>
    </Card>
  );
}
