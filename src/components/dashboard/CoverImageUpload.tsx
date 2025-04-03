
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Upload, Trash } from "lucide-react";
import { toast } from "sonner";

interface CoverImageUploadProps {
  coverImage: string | null;
  setCoverImage: (url: string | null) => void;
}

export const CoverImageUpload = ({ coverImage, setCoverImage }: CoverImageUploadProps) => {
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

  return (
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
  );
};
