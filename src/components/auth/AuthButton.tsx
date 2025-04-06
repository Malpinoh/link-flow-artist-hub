
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AuthButtonProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
}

export function AuthButton({ onAuthChange }: AuthButtonProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session first
    async function getSession() {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        setUser(data.session?.user || null);
        if (onAuthChange) {
          onAuthChange(!!data.session?.user);
        }
      } catch (err) {
        console.error('Failed to get session:', err);
      } finally {
        setLoading(false);
      }
    }

    getSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      setUser(session?.user || null);
      if (onAuthChange) {
        onAuthChange(!!session?.user);
      }
      
      // Redirect to dashboard on login
      if (event === 'SIGNED_IN') {
        toast.success("Successfully signed in!");
        navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        toast.success("You have been signed out");
        navigate('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onAuthChange, navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      // For email/password login, use the login page instead
      navigate('/');
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      // Don't navigate here - let the auth state change handler do it
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Sign out failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Button disabled variant="outline">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <Button variant="outline" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button onClick={handleLogin}>
      <LogIn className="h-4 w-4 mr-2" />
      Sign In
    </Button>
  );
}
