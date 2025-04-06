
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Loading your links..." }: LoadingStateProps) {
  return (
    <div className="flex justify-center py-12">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4">
          <Loader2 className="h-6 w-6 text-white animate-spin" />
        </div>
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
