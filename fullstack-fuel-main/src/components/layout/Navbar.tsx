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
            {/* Top-right menu with partner/mentor/upscale links */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2" aria-label="More">
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" className="w-56">
                <DropdownMenuItem>
                  <Link to="/become-partner" className="w-full block">Becoming partner</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/become-mentor" className="w-full block">Becoming mentor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/upscale" className="w-full block">Upscale</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth?mode=signup">Sign Up</Link>
            </Button>
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
              <Link to="/become-partner" className="text-muted-foreground hover:text-foreground transition-colors">
                Becoming partner
              </Link>
              <Link to="/become-mentor" className="text-muted-foreground hover:text-foreground transition-colors">
                Becoming mentor
              </Link>
              <Link to="/upscale" className="text-muted-foreground hover:text-foreground transition-colors">
                Upscale
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
