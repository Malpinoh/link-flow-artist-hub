
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { FanLinkPreview } from "./FanLinkPreview";
import { FanLink } from "@/types/fanlink";
import { Music, Image, Link2, Save } from "lucide-react";

export function CreateFanLink() {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [fanLink, setFanLink] = useState<FanLink>({
    track_name: "",
    cover_art_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1740&auto=format&fit=crop",
    streaming_links: {
      spotify: "",
      apple_music: "",
      youtube: "",
      soundcloud: ""
    },
    pre_save_links: {
      spotify: "",
      apple_music: ""
    },
    cta_button_text: "Stream Now",
    background_color: "#3a10e5"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith("streaming_")) {
      const platform = name.replace("streaming_", "");
      setFanLink({
        ...fanLink,
        streaming_links: {
          ...fanLink.streaming_links,
          [platform]: value
        }
      });
    } else if (name.startsWith("pre_save_")) {
      const platform = name.replace("pre_save_", "");
      setFanLink({
        ...fanLink,
        pre_save_links: {
          ...fanLink.pre_save_links,
          [platform]: value
        }
      });
    } else {
      setFanLink({
        ...fanLink,
        [name]: value
      });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFanLink({
      ...fanLink,
      background_color: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real implementation, this would upload the file to Supabase Storage
      // For now, we'll create a temporary URL
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      const fieldName = e.target.name;
      
      if (fieldName === "cover_art") {
        setFanLink({
          ...fanLink,
          cover_art_url: fileUrl
        });
      } else if (fieldName === "background_image") {
        setFanLink({
          ...fanLink,
          background_image_url: fileUrl,
          // Clear background color when image is set
          background_color: undefined
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fanLink.track_name) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please add a track name."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would save to Supabase in a real implementation
      console.log("Saving FanLink:", fanLink);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "FanLink created!",
        description: "Your music link has been created successfully."
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to create FanLink",
        description: "There was an error saving your music link."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-6">Create New FanLink</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="track_name" className="text-base">Track Name</Label>
                        <Input
                          id="track_name"
                          name="track_name"
                          placeholder="Enter your track name"
                          value={fanLink.track_name}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cover_art" className="text-base">Cover Art</Label>
                        <div className="mt-1.5 space-y-2">
                          <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                              {fanLink.cover_art_url ? (
                                <img
                                  src={fanLink.cover_art_url}
                                  alt="Cover Art Preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Image className="h-8 w-8 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <Input
                                id="cover_art"
                                name="cover_art"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Recommended size: 1000x1000px, max 2MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cta_button_text" className="text-base">Button Text</Label>
                        <Input
                          id="cta_button_text"
                          name="cta_button_text"
                          placeholder="Stream Now"
                          value={fanLink.cta_button_text}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("links")}>
                    Continue to Links
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="links" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Streaming Links</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="streaming_spotify">
                              <div className="flex items-center">
                                <Music className="h-4 w-4 mr-2" /> Spotify
                              </div>
                            </Label>
                            <Input
                              id="streaming_spotify"
                              name="streaming_spotify"
                              placeholder="https://open.spotify.com/track/..."
                              value={fanLink.streaming_links.spotify}
                              onChange={handleChange}
                              className="mt-1.5"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="streaming_apple_music">
                              <div className="flex items-center">
                                <Music className="h-4 w-4 mr-2" /> Apple Music
                              </div>
                            </Label>
                            <Input
                              id="streaming_apple_music"
                              name="streaming_apple_music"
                              placeholder="https://music.apple.com/us/album/..."
                              value={fanLink.streaming_links.apple_music}
                              onChange={handleChange}
                              className="mt-1.5"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="streaming_youtube">
                              <div className="flex items-center">
                                <Music className="h-4 w-4 mr-2" /> YouTube
                              </div>
                            </Label>
                            <Input
                              id="streaming_youtube"
                              name="streaming_youtube"
                              placeholder="https://youtube.com/watch?v=..."
                              value={fanLink.streaming_links.youtube}
                              onChange={handleChange}
                              className="mt-1.5"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="streaming_soundcloud">
                              <div className="flex items-center">
                                <Music className="h-4 w-4 mr-2" /> SoundCloud
                              </div>
                            </Label>
                            <Input
                              id="streaming_soundcloud"
                              name="streaming_soundcloud"
                              placeholder="https://soundcloud.com/..."
                              value={fanLink.streaming_links.soundcloud}
                              onChange={handleChange}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Pre-Save Links (Optional)</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="pre_save_spotify">
                              <div className="flex items-center">
                                <Link2 className="h-4 w-4 mr-2" /> Spotify Pre-Save
                              </div>
                            </Label>
                            <Input
                              id="pre_save_spotify"
                              name="pre_save_spotify"
                              placeholder="https://distrokid.com/hyperfollow/..."
                              value={fanLink.pre_save_links?.spotify || ""}
                              onChange={handleChange}
                              className="mt-1.5"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="pre_save_apple_music">
                              <div className="flex items-center">
                                <Link2 className="h-4 w-4 mr-2" /> Apple Music Pre-Add
                              </div>
                            </Label>
                            <Input
                              id="pre_save_apple_music"
                              name="pre_save_apple_music"
                              placeholder="https://music.apple.com/us/album/..."
                              value={fanLink.pre_save_links?.apple_music || ""}
                              onChange={handleChange}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("design")}>
                    Continue to Design
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base">Background</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label htmlFor="background_color" className="text-sm">Color</Label>
                            <div className="flex items-center mt-1.5">
                              <input
                                type="color"
                                id="background_color"
                                name="background_color"
                                value={fanLink.background_color || "#3a10e5"}
                                onChange={handleColorChange}
                                className="h-10 w-10 rounded-md overflow-hidden"
                              />
                              <Input
                                value={fanLink.background_color || "#3a10e5"}
                                onChange={handleColorChange}
                                className="ml-2 w-24"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="background_image" className="text-sm">Image (Optional)</Label>
                            <Input
                              id="background_image"
                              name="background_image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("links")}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSubmitting ? "Creating..." : "Create FanLink"}
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
        
        <div className="hidden lg:block sticky top-8 h-fit">
          <div className="bg-muted rounded-xl p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <p className="text-sm text-muted-foreground">This is how your FanLink will appear to listeners.</p>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <FanLinkPreview fanLink={fanLink} />
          </div>
        </div>
      </div>
    </div>
  );
}
