
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Menu } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";
import { useState } from "react";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn: initialLoggedIn = false }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-bold text-xl flex items-center">
          <img 
            src="/lovable-uploads/5ce56a01-182d-4d22-8da7-ebce54d2c617.png" 
            alt="MALPINOHDISTRO FAN LINK" 
            className="h-8 w-auto mr-2" 
          />
          <span className="text-gradient bg-clip-text text-transparent hidden sm:inline">MALPINOHDISTRO FAN LINK</span>
          <span className="text-gradient bg-clip-text text-transparent sm:hidden">FANLINK</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <a href="https://malpinohdistro.com.ng/blog" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
          <Link to="/legal" className="text-muted-foreground hover:text-foreground transition-colors">Legal</Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn && (
            <Button asChild variant="outline" size="sm">
              <Link to="/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Link
              </Link>
            </Button>
          )}
          <AuthButton onAuthChange={setIsLoggedIn} />
          <AuthStatus />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <AuthButton onAuthChange={setIsLoggedIn} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                {isLoggedIn && (
                  <Link to="/new" className="text-foreground hover:text-primary transition-colors flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Link
                  </Link>
                )}
                <a href="https://malpinohdistro.com.ng/blog" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">Blog</a>
                <Link to="/resources" className="text-foreground hover:text-primary transition-colors">Resources</Link>
                <Link to="/legal" className="text-foreground hover:text-primary transition-colors">Legal</Link>
                <div className="pt-4 border-t">
                  <AuthStatus />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
