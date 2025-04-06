
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Edit, ExternalLink } from "lucide-react";
import { FanLink } from "@/types/fanlink";

interface LinkCardProps {
  link: FanLink;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
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
  );
}
