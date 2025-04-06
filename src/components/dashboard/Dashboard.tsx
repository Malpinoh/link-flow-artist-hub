
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import { DashboardHeader } from "./DashboardHeader";
import { LinksGrid } from "./LinksGrid";
import { LoadingState } from "./LoadingState";
import { useFanLinks } from "@/hooks/useFanLinks";

export function Dashboard() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          toast.info("Please sign in to view your dashboard");
          // User not logged in, redirect to sign in after a short delay
          setTimeout(() => navigate("/"), 1500);
          return;
        }
        
        setUserId(data.session.user.id);
        setAuthChecked(true);
      } catch (error) {
        console.error("Error checking auth:", error);
        toast.error("Authentication error. Please try signing in again.");
        setTimeout(() => navigate("/"), 1500);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      if (!session && authChecked) {
        // Only redirect if we've already checked auth (prevents double redirects)
        toast.info("Your session has ended. Please sign in again.");
        navigate("/");
      }
    });
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate, authChecked]);
  
  // Use our custom hook to manage fan links
  const { fanLinks, loading } = useFanLinks(userId);
  
  if (!authChecked || loading) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <LoadingState message={authChecked ? "Loading your links..." : "Checking authentication..."} />
      </div>
    );
  }
  
  return (
    <div className="container py-8 px-4 md:px-6 space-y-8">
      <DashboardHeader />
      <LinksGrid fanLinks={fanLinks} />
    </div>
  );
}
