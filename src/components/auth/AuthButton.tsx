
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthButtonProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
}

export function AuthButton({ onAuthChange }: AuthButtonProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error getting user:', error);
          return;
        }
        setUser(data.user);
        if (onAuthChange) {
          onAuthChange(!!data.user);
        }
      } catch (err) {
        console.error('Failed to get user:', err);
      } finally {
        setLoading(false);
      }
    }

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (onAuthChange) {
        onAuthChange(!!session?.user);
      }
    });

    getUser();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [onAuthChange]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        toast.error("Sign in failed. Please try again.");
      }
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
      toast.success("You have been signed out");
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
