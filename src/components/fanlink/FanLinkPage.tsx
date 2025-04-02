
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FanLinkPreview } from "@/components/dashboard/FanLinkPreview";
import { dummyFanLinks } from "@/lib/dummy-data";
import { FanLink } from "@/types/fanlink";
import { Music } from "lucide-react";

export function FanLinkPage() {
  const { slug } = useParams<{ slug: string }>();
  const [fanLink, setFanLink] = useState<FanLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFanLink() {
      try {
        setLoading(true);
        
        // In a real app, this would fetch from Supabase
        // Using dummy data for demonstration
        const found = dummyFanLinks.find(link => link.slug === slug);
        
        if (found) {
          setFanLink(found);
        } else {
          setError("FanLink not found");
        }
      } catch (err) {
        setError("Failed to load FanLink");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFanLink();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Music size={24} className="text-white" />
          </div>
          <p className="text-muted-foreground">Loading music link...</p>
        </div>
      </div>
    );
  }

  if (error || !fanLink) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center mx-auto mb-4">
            <Music size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Link Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the music link you're looking for. It may have been removed or the URL is incorrect.
          </p>
          <a href="/" className="text-primary underline">
            Return to homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <FanLinkPreview fanLink={fanLink} isPreview={false} />
      <div className="py-4 text-center text-xs text-muted-foreground">
        <p>Created with FanLink</p>
      </div>
    </div>
  );
}
