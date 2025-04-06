
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Links</h1>
        <p className="text-muted-foreground">Manage and track all your music links in one place.</p>
      </div>
      <Button asChild>
        <Link to="/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Link
        </Link>
      </Button>
    </div>
  );
}
