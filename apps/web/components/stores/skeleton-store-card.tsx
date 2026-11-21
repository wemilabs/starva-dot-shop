import { Card, CardHeader } from "@starva/ui/components/card";
import { Skeleton } from "@starva/ui/components/skeleton";

export function SkeletonStoreCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Skeleton className="size-14 rounded-full" />
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-5 w-[180px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
