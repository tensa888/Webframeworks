import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Vyoma Placement Cell</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/opportunities" className="text-muted-foreground hover:text-foreground transition-colors">
              Opportunities
            </Link>
            <Link to="/companies" className="text-muted-foreground hover:text-foreground transition-colors">
              Companies
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth?mode=signup">Sign Up</Link>
            </Button>

            {/* Rightmost menu button styled as 3x3 dots grid */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-10 h-10 p-2 rounded-md" aria-label="More">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentColor">
                      <circle cx="3" cy="3" r="1.2" />
                      <circle cx="9" cy="3" r="1.2" />
                      <circle cx="15" cy="3" r="1.2" />
                      <circle cx="3" cy="9" r="1.2" />
                      <circle cx="9" cy="9" r="1.2" />
                      <circle cx="15" cy="9" r="1.2" />
                      <circle cx="3" cy="15" r="1.2" />
                      <circle cx="9" cy="15" r="1.2" />
                      <circle cx="15" cy="15" r="1.2" />
                    </g>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="w-56">
                <DropdownMenuItem>
                  <Link to="/extras" className="w-full block">Explore Extras</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/opportunities" className="text-muted-foreground hover:text-foreground transition-colors">
                Opportunities
              </Link>
              <Link to="/companies" className="text-muted-foreground hover:text-foreground transition-colors">
                Companies
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/extras" className="text-muted-foreground hover:text-foreground transition-colors">
                Extras
              </Link>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/auth?mode=signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
