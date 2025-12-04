import { Bell, Search, Users, BarChart3, FileCheck, Building2 } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "No More Missed Emails",
    description: "Get real-time notifications for relevant opportunities",
  },
  {
    icon: Search,
    title: "Personalized for You",
    description: "Only see internships matching your stream and preferences",
  },
  {
    icon: Users,
    title: "Connect With Companies",
    description: "Apply directly to verified companies within the platform",
  },
  {
    icon: BarChart3,
    title: "Transparent Tracking",
    description: "Stay updated on your application status until selection",
  },
  {
    icon: FileCheck,
    title: "Manage Applications",
    description: "Track all your applications in one centralized dashboard",
  },
  {
    icon: Building2,
    title: "Top Companies",
    description: "Access opportunities from leading companies across industries",
  },
];

const Features = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Vyoma Placement Cell?
          </h2>
          <p className="text-muted-foreground">
            Everything you need to land your dream internship or job
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
