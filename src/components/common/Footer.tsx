
import { Link } from "react-router-dom";
import { Music, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/5ce56a01-182d-4d22-8da7-ebce54d2c617.png" 
                alt="MALPINOHDISTRO FAN LINK" 
                className="h-8 w-auto" 
              />
              <span className="font-bold text-xl">MALPINOHDISTRO FAN LINK</span>
            </div>
            <p className="text-sm text-muted-foreground">
              One link for all your music. Share your latest releases across all platforms with a single link.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://malpinohdistro.com.ng/blog" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><a href="https://malpinohdistro.com.ng" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors font-medium">DISTRIBUTE MUSIC</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/gdpr" className="text-muted-foreground hover:text-foreground transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MALPINOHDISTRO FAN LINK. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://instagram.com/malpinohdistro" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com/malpinohdistro" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="mailto:info@malpinohdistro.com.ng" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
