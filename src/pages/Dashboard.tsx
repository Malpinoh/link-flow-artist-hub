
import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { CreateFanLink } from "@/components/dashboard/CreateFanLink";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCreating = location.pathname === "/new";
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          toast.info("Please sign in to access the dashboard");
          navigate('/');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication error");
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={false} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full music-gradient flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isAuthenticated} />
      <main className="flex-1">
        {isCreating ? (
          <CreateFanLink />
        ) : (
          <Dashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
