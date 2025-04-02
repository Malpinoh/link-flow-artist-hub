
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, ExternalLink, Calendar, Edit } from "lucide-react";
import { dummyFanLinks } from "@/lib/dummy-data";
import { FanLink } from "@/types/fanlink";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export function Dashboard() {
  const [fanLinks, setFanLinks] = useState<FanLink[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchFanLinks() {
      try {
        setLoading(true);
        
        if (import.meta.env.DEV && !import.meta.env.VITE_USE_SUPABASE) {
          // Use dummy data in development if not using Supabase
          setFanLinks(dummyFanLinks);
          return;
        }
        
        const { data: user } = await supabase.auth.getUser();
        
        if (!user?.user) {
          console.log("No authenticated user found");
          setFanLinks([]);
          return;
        }
        
        // Fetch from Supabase
        const { data, error } = await supabase
          .from('fan_links')
          .select(`
            *,
            streaming_links(*)
          `)
          .eq('user_id', user.user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching fan links:', error);
          toast.error("Error loading your links");
          setFanLinks([]);
          return;
        }
        
        if (!data || data.length === 0) {
          setFanLinks([]);
          return;
        }
        
        // Transform the data to match our FanLink type
        const transformedData: FanLink[] = data.map((link: any) => {
          const fanLink: FanLink = {
            id: link.id,
            artist_id: link.user_id,
            track_name: link.title,
            cover_art_url: link.cover_image,
            streaming_links: {},
            cta_button_text: "Stream Now",
            background_color: link.background_color,
            background_image_url: link.background_image,
            created_at: link.created_at,
            slug: link.slug
          };
          
          // Transform streaming links
          if (link.streaming_links) {
            link.streaming_links.forEach((streamLink: any) => {
              fanLink.streaming_links[streamLink.platform as keyof typeof fanLink.streaming_links] = streamLink.url;
            });
          }
          
          return fanLink;
        });
        
        setFanLinks(transformedData);
      } catch (err) {
        console.error("Failed to load links:", err);
        toast.error("Error loading your links");
        setFanLinks([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFanLinks();
  }, []);
  
  return (
    <div className="container py-8 px-4 md:px-6 space-y-8">
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
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-white">...</span>
            </div>
            <p className="text-muted-foreground">Loading your links...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fanLinks.map((link) => (
            <Card key={link.id} className="glass-card overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={link.cover_art_url}
                  alt={link.track_name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <h3 className="text-xl font-bold text-white">{link.track_name}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {link.created_at 
                      ? new Date(link.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })
                      : 'Date not available'}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(link.streaming_links).map((platform) => (
                    <div key={platform} className="px-2 py-1 bg-muted rounded-md text-xs capitalize">
                      {platform.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" asChild size="sm">
                    <Link to={`/edit/${link.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="sm">
                    <Link to={`/link/${link.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {fanLinks.length === 0 && (
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
          )}
        </div>
      )}
    </div>
  );
}
