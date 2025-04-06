
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FanLinkPreview } from "./FanLinkPreview";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { getFanLinkById, updateLink } from "@/utils/fanLinkUtils";
import { FanLink } from "@/types/fanlink";
import { CoverImageUpload } from "./CoverImageUpload";
import { AppearanceSettings } from "./AppearanceSettings";
import { StreamingLinks } from "./StreamingLinks";

export const EditFanLink = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [buttonColor, setButtonColor] = useState("#4b00e0");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");
  const [buttonText, setButtonText] = useState("Stream Now");
  const [slug, setSlug] = useState("");
  const [streamingLinks, setStreamingLinks] = useState<{platform: string, url: string}[]>([]);
  
  useEffect(() => {
    const fetchFanLink = async () => {
      if (!id) {
        toast.error("Invalid link ID");
        navigate("/dashboard");
        return;
      }
      
      setIsLoading(true);
      
      try {
        const fanLink = await getFanLinkById(id);
        
        if (!fanLink) {
          toast.error("Link not found");
          navigate("/dashboard");
          return;
        }
        
        setTitle(fanLink.title);
        setArtist(fanLink.artist);
        setCoverImage(fanLink.cover_image);
        setBackgroundColor(fanLink.background_color || "#000000");
        setTextColor(fanLink.text_color || "#FFFFFF");
        setButtonColor(fanLink.button_color || "#4b00e0");
        setButtonTextColor(fanLink.button_text_color || "#FFFFFF");
        setButtonText(fanLink.button_text || "Stream Now");
        setSlug(fanLink.slug);
        
        // Transform streaming links
        if (fanLink.streaming_links) {
          const links = fanLink.streaming_links.map((link: any) => ({
            platform: link.platform,
            url: link.url
          }));
          setStreamingLinks(links);
        }
      } catch (error) {
        console.error("Error fetching fan link:", error);
        toast.error("Failed to load link data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFanLink();
  }, [id, navigate]);
  
  const handleSave = async () => {
    if (!id) return;
    
    setIsSaving(true);
    
    try {
      const result = await updateLink(
        id,
        title,
        artist,
        slug,
        coverImage,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor,
        buttonText,
        streamingLinks
      );
      
      if (result) {
        toast.success("Link updated successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error updating link:", error);
      toast.error("Failed to update link");
    } finally {
      setIsSaving(false);
    }
  };
  
  const previewFanLink: FanLink = {
    track_name: title || "Your Track Title",
    cover_art_url: coverImage || "https://placehold.co/500x500/111/333?text=Cover+Art",
    cta_button_text: buttonText,
    background_color: backgroundColor,
    streaming_links: streamingLinks.reduce((acc, link) => {
      acc[link.platform] = link.url;
      return acc;
    }, {} as Record<string, string>)
  };
  
  if (isLoading) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
            <p className="text-muted-foreground">Loading link details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 px-4 md:px-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Link</h1>
        <p className="text-muted-foreground">Update your music link landing page.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Link Details</CardTitle>
            <CardDescription>Update information about your music release</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Track or Album Title *</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the name of your release"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist Name *</Label>
                  <Input 
                    id="artist" 
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Your artist name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Custom Link *</Label>
                <div className="flex">
                  <div className="bg-muted px-3 py-2 border border-r-0 border-input rounded-l-md text-sm text-muted-foreground flex items-center">
                    link.malpinohdistro.com.ng/
                  </div>
                  <Input 
                    id="slug" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/[^\w-]+/g, ''))}
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cover-image">Cover Art *</Label>
                <CoverImageUpload 
                  coverImage={coverImage} 
                  setCoverImage={setCoverImage} 
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Streaming Links *</Label>
                <StreamingLinks 
                  streamingLinks={streamingLinks}
                  setStreamingLinks={setStreamingLinks}
                />
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-4">Appearance</h3>
                <AppearanceSettings
                  backgroundColor={backgroundColor}
                  setBackgroundColor={setBackgroundColor}
                  textColor={textColor}
                  setTextColor={setTextColor}
                  buttonColor={buttonColor}
                  setButtonColor={setButtonColor}
                  buttonTextColor={buttonTextColor}
                  setButtonTextColor={setButtonTextColor}
                  buttonText={buttonText}
                  setButtonText={setButtonText}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="sticky top-8">
          <h2 className="font-medium text-lg mb-4">Preview</h2>
          <div className="border rounded-md overflow-hidden">
            <FanLinkPreview
              fanLink={previewFanLink}
              isPreview={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
