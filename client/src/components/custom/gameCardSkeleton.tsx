import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function GameCardSkeleton() {
  return (
    <Card className="relative p-0 m-5 h-40 w-40 overflow-hidden">
      <CardContent className="p-0 h-full">
        <Skeleton className="w-full h-full" />
      </CardContent>
    </Card>
  );
}
