
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FanLink from "./pages/FanLink";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import GDPR from "./pages/GDPR";
import HelpCenter from "./pages/HelpCenter";
import { enableRealtimeForTables } from "./utils/supabaseUtils";
import { useEffect } from "react";

// Create a new QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Enable realtime tables when the app loads
  useEffect(() => {
    enableRealtimeForTables().catch(console.error);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster position="top-right" />
        <BrowserRouter basename={process.env.NODE_ENV === "production" ? "" : ""}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<Dashboard />} />
            <Route path="/edit/:id" element={<Dashboard />} />
            <Route path="/link/:slug" element={<FanLink />} />
            <Route path="/l/:slug" element={<FanLink />} /> {/* Short URL alternative */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/help" element={<HelpCenter />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
