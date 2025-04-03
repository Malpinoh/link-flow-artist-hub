
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Music, Plus, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { MUSIC_PLATFORMS } from "@/constants/platforms";

interface StreamingLink {
  platform: string;
  url: string;
}

interface StreamingLinksProps {
  streamingLinks: StreamingLink[];
  setStreamingLinks: (links: StreamingLink[]) => void;
}

export const StreamingLinks = ({ streamingLinks, setStreamingLinks }: StreamingLinksProps) => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");

  const addStreamingLink = () => {
    if (!platform || !url) {
      toast.error("Please select a platform and enter a URL");
      return;
    }
    
    if (!url.startsWith("https://")) {
      toast.error("URL must start with https://");
      return;
    }
    
    const platformName = MUSIC_PLATFORMS.find(p => p.id === platform)?.name || platform;
    
    setStreamingLinks([...streamingLinks, {
      platform: platform,
      url: url
    }]);
    
    setPlatform("");
    setUrl("");
    
    toast.success(`Added ${platformName} link`);
  };
  
  const removeStreamingLink = (index: number) => {
    const newLinks = [...streamingLinks];
    newLinks.splice(index, 1);
    setStreamingLinks(newLinks);
  };

  return (
    <div>
      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="space-y-4">
            {streamingLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-md">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <Music className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {MUSIC_PLATFORMS.find(p => p.id === link.platform)?.name || link.platform}
                    </p>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground flex items-center hover:underline"
                    >
                      {link.url.length > 40 ? link.url.substring(0, 40) + '...' : link.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStreamingLink(index)}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
            
            <div className="pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Streaming Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Streaming Link</DialogTitle>
                    <DialogDescription>
                      Add a link to your music on streaming platforms
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <FormLabel>Platform</FormLabel>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                      >
                        <option value="">Select a platform</option>
                        {MUSIC_PLATFORMS.map((platform) => (
                          <option key={platform.id} value={platform.id}>
                            {platform.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>URL</FormLabel>
                      <Input
                        placeholder="https://..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button onClick={addStreamingLink}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
