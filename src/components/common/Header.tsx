
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";
import { useState } from "react";
import { AuthStatus } from "@/components/auth/AuthStatus";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn: initialLoggedIn = false }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-bold text-xl flex items-center">
          <span className="text-gradient bg-clip-text text-transparent">MALPINOHDISTRO LINK</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition">Home</Link>
          <a href="https://malpinohdistro.com.ng/blog" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">Blog</a>
          <Link to="/resources" className="text-muted-foreground hover:text-foreground transition">Resources</Link>
          <Link to="/legal" className="text-muted-foreground hover:text-foreground transition">Legal</Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          {isLoggedIn && (
            <Button asChild variant="outline" size="sm" className="hidden md:flex">
              <Link to="/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Link
              </Link>
            </Button>
          )}
          <AuthButton onAuthChange={setIsLoggedIn} />
          <AuthStatus />
        </div>
      </div>
    </header>
  );
}
