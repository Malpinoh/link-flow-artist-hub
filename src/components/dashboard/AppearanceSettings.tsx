
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppearanceSettingsProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  buttonColor: string;
  setButtonColor: (color: string) => void;
  buttonTextColor: string;
  setButtonTextColor: (color: string) => void;
  buttonText: string;
  setButtonText: (text: string) => void;
}

export const AppearanceSettings = ({
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
  buttonColor,
  setButtonColor,
  buttonTextColor,
  setButtonTextColor,
  buttonText,
  setButtonText
}: AppearanceSettingsProps) => {
  return (
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
  );
};
