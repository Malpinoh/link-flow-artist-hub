
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export function EmptyState() {
  return (
    <Card className="col-span-full p-8 text-center">
      <CardContent className="pt-6 flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4">
          <PlusCircle size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">No Links yet</h3>
          <p className="text-muted-foreground">
            Create your first link to start promoting your music across platforms.
          </p>
        </div>
        <Button asChild className="mt-4">
          <Link to="/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Link
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
