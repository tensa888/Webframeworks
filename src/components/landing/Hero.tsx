import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Use external or public placeholder images; removed bundled heroImage import

const Hero = () => {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <span className="text-primary font-semibold tracking-wide uppercase text-sm">
              Placement Portal
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Your Gateway to{" "}
              <span className="text-primary">Internships</span>, Careers & Opportunities
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Find relevant internships, connect with companies, and track your entire placement journey—all in one unified platform.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/auth?mode=signup&type=student">Sign Up as Student</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth?mode=signup&type=company">Sign Up as Company</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={"https://vidyashilp.edu.in/wp-content/uploads/2023/04/slide_banner1.jpg"}
                alt="Students and professionals collaborating in modern office"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-lg border border-border hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Companies Hiring</p>
                </div>
              </div>
            </div>
            {/* middle image removed */}
            <div className="absolute -top-4 -right-4 bg-card rounded-xl p-4 shadow-lg border border-border hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">📊</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">10,000+</p>
                  <p className="text-sm text-muted-foreground">Students Placed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
