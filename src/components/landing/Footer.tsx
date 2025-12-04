import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Vyoma Placement Cell</span>
            </Link>
            <p className="text-background/70 text-sm">
              Your gateway to internships, careers & opportunities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/opportunities" className="hover:text-background transition-colors">Browse Opportunities</Link></li>
              <li><Link to="/companies" className="hover:text-background transition-colors">View Companies</Link></li>
              <li><Link to="/auth" className="hover:text-background transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Companies</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/auth?type=company" className="hover:text-background transition-colors">Post Opportunities</Link></li>
              <li><Link to="/pricing" className="hover:text-background transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Sales</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>© 2024 Vyoma Placement Cell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
