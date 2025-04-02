
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Music,
  Menu,
  X,
  Home,
  LogOut,
  User,
  Settings,
  PlusCircle
} from "lucide-react";

export function Header({ isLoggedIn = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative z-50">
      <nav className="container flex items-center justify-between py-4 px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full music-gradient flex items-center justify-center">
            <Music size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl">MALPINOHDISTRO LINK</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Link
                </Link>
              </Button>
              <Button asChild variant="default">
                <Link to="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/">Home</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/features">Features</Link>
              </Button>
              <Button asChild variant="default">
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 pt-20">
          <div className="flex flex-col space-y-4 p-6">
            {isLoggedIn ? (
              <>
                <Button asChild variant="ghost" className="justify-start" onClick={toggleMobileMenu}>
                  <Link to="/dashboard" className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="justify-start" onClick={toggleMobileMenu}>
                  <Link to="/new" className="flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Link
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="justify-start" onClick={toggleMobileMenu}>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="justify-start" onClick={toggleMobileMenu}>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Link>
                </Button>
                <Button asChild variant="default" className="justify-start mt-4" onClick={toggleMobileMenu}>
                  <Link to="/" className="flex items-center">
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="justify-start" onClick={toggleMobileMenu}>
                  <Link to="/">Home</Link>
                </Button>
                <Button asChild variant="ghost" className="justify-start" onClick={toggleMobileMenu}>
                  <Link to="/features">Features</Link>
                </Button>
                <Button asChild variant="default" className="justify-start mt-4" onClick={toggleMobileMenu}>
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
