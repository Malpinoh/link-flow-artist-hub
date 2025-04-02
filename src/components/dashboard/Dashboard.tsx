
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ExternalLink, Calendar, LinkIcon, Edit } from "lucide-react";
import { dummyFanLinks } from "@/lib/dummy-data";
import { FanLink } from "@/types/fanlink";

export function Dashboard() {
  const [fanLinks, setFanLinks] = useState<FanLink[]>(dummyFanLinks);
  
  return (
    <div className="container py-8 px-4 md:px-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your FanLinks</h1>
          <p className="text-muted-foreground">Manage and track all your music links in one place.</p>
        </div>
        <Button asChild>
          <Link to="/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Link
          </Link>
        </Button>
      </div>
      
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
              <LinkIcon size={48} className="text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">No FanLinks yet</h3>
                <p className="text-muted-foreground">
                  Create your first FanLink to start promoting your music across platforms.
                </p>
              </div>
              <Button asChild>
                <Link to="/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Link
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
