import Header from "@/components/app/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="mb-4 text-xl font-semibold">Buyer Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-white text-gray-900">
              <CardHeader><Skeleton className="h-4 w-32" /></CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
