
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Music, Mail, Lock, ArrowRight } from "lucide-react";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (mode: "login" | "signup") => {
    setIsLoading(true);
    
    try {
      // This would connect to Supabase in a real implementation
      console.log(`Attempting to ${mode} with email: ${email}`);
      
      // Simulate auth success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created!",
        description: mode === "login" ? "You've successfully logged in." : "Your account has been created successfully.",
      });
      
      // Redirect to dashboard in a real implementation
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md glass-card">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center">
            <Music size={24} className="text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Welcome to FanLink</CardTitle>
        <CardDescription className="text-center">
          Create one link for all your music
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  type="email" 
                  placeholder="artist@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full"
              disabled={isLoading}
              onClick={() => handleAuth("login")}
            >
              {isLoading ? "Logging in..." : "Login"} 
              {!isLoading && <ArrowRight size={16} className="ml-2" />}
            </Button>
            <div className="text-center mt-4">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot password?
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="signup-email"
                  type="email" 
                  placeholder="artist@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="signup-password"
                  type="password" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full"
              disabled={isLoading}
              onClick={() => handleAuth("signup")}
            >
              {isLoading ? "Creating account..." : "Create Account"} 
              {!isLoading && <ArrowRight size={16} className="ml-2" />}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="text-center w-full text-sm text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </CardFooter>
    </Card>
  );
}
