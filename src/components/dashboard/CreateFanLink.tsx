
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormLabel } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FanLinkPreview } from "./FanLinkPreview";
import { Music, Plus, Image, Upload, X, Trash, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

const MUSIC_PLATFORMS = [
  { id: "spotify", name: "Spotify" },
  { id: "apple_music", name: "Apple Music" },
  { id: "youtube_music", name: "YouTube Music" },
  { id: "youtube", name: "YouTube" },
  { id: "audiomack", name: "Audiomack" },
  { id: "boomplay", name: "Boomplay" },
  { id: "deezer", name: "Deezer" },
  { id: "tidal", name: "Tidal" },
  { id: "soundcloud", name: "SoundCloud" },
  { id: "bandcamp", name: "Bandcamp" },
  { id: "amazon_music", name: "Amazon Music" },
];

export const CreateFanLink = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  
  // Generate a slug based on the title
  const generateSlug = () => {
    if (title) {
      const baseSlug = title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      
      // Add a short random string to make it unique
      const randomString = Math.random().toString(36).substring(2, 6);
      setSlug(`${baseSlug}-${randomString}`);
    }
  };
  
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
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.includes('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const saveLink = async () => {
    if (!title || !artist || !slug || !coverImage) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    if (streamingLinks.length === 0) {
      toast.error("Please add at least one streaming link");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create a link");
        navigate("/");
        return;
      }
      
      // Create a new fan link
      const { data: fanLink, error: fanLinkError } = await supabase.from('fan_links').insert({
        title,
        artist,
        slug,
        cover_image: coverImage,
        background_color: backgroundColor,
        text_color: textColor,
        button_color: buttonColor,
        button_text_color: buttonTextColor,
        user_id: user.id,
      }).select().single();
      
      if (fanLinkError) throw fanLinkError;
      
      // Add streaming links
      const streamingLinksData = streamingLinks.map((link, index) => ({
        fan_link_id: fanLink.id,
        platform: link.platform,
        url: link.url,
        position: index
      }));
      
      const { error: streamingLinksError } = await supabase.from('streaming_links').insert(streamingLinksData);
      
      if (streamingLinksError) throw streamingLinksError;
      
      toast.success("Your link has been created!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error saving link:", error);
      toast.error(error.message || "An error occurred while saving your link");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container py-8 px-4 md:px-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Link</h1>
        <p className="text-muted-foreground">Create a landing page with links to your music across platforms.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Link Details</CardTitle>
            <CardDescription>Enter information about your music release</CardDescription>
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
                <div className="flex justify-between">
                  <Label htmlFor="slug">Custom Link *</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={generateSlug}
                    type="button"
                    className="h-6 text-xs"
                  >
                    Generate
                  </Button>
                </div>
                <div className="flex">
                  <div className="bg-muted px-3 py-2 border border-r-0 border-input rounded-l-md text-sm text-muted-foreground flex items-center">
                    {window.location.origin}/link/
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
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-4 h-[300px] relative">
                  {coverImage ? (
                    <>
                      <img 
                        src={coverImage} 
                        alt="Cover Preview" 
                        className="max-h-[250px] max-w-full object-contain rounded"
                      />
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setCoverImage(null)}
                        className="absolute bottom-4 right-4"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <Label 
                        htmlFor="image-upload" 
                        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Label>
                      <p className="text-xs text-muted-foreground">PNG, JPG or WebP (max. 5MB)</p>
                      <Input 
                        id="image-upload" 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <Label className="mb-2 block">Streaming Links *</Label>
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
              
              <div className="pt-4">
                <h3 className="font-medium mb-4">Appearance (Optional)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex">
                      <Input
                        id="background-color"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex">
                      <Input
                        id="text-color"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                      <Input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="button-color">Button Color</Label>
                    <div className="flex">
                      <Input
                        id="button-color"
                        type="color"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                      <Input
                        type="text"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="button-text-color">Button Text Color</Label>
                    <div className="flex">
                      <Input
                        id="button-text-color"
                        type="color"
                        value={buttonTextColor}
                        onChange={(e) => setButtonTextColor(e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                      <Input
                        type="text"
                        value={buttonTextColor}
                        onChange={(e) => setButtonTextColor(e.target.value)}
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="button-text">Button Text</Label>
                    <Input
                      id="button-text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="Stream Now"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button onClick={saveLink} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save & Publish Link
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="sticky top-8">
          <h2 className="font-medium text-lg mb-4">Preview</h2>
          <div className="border rounded-md overflow-hidden">
            <FanLinkPreview
              title={title || "Your Track Title"}
              artist={artist || "Artist Name"}
              coverImage={coverImage || "https://placehold.co/500x500/111/333?text=Cover+Art"}
              backgroundColor={backgroundColor}
              textColor={textColor}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              buttonText={buttonText}
              streamingLinks={streamingLinks.map(link => ({
                platform: link.platform,
                url: link.url
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
