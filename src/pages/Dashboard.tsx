import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import StatCard from "@/components/dashboard/StatCard";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, FileText, Star, Clock, Filter } from "lucide-react";
import { useAuth } from "@/lib/auth";

const opportunities = [
  {
    title: "Software Development Intern",
    company: "InnoTech",
    location: "Bangalore",
    salary: "₹25,000/month",
    deadline: "31 Dec 2024",
    matchPercentage: 92,
    type: "Computer Science",
  },
  {
    title: "Data Analyst Intern",
    company: "DataWiz",
    location: "Mumbai",
    salary: "₹20,000/month",
    deadline: "20 Dec 2024",
    matchPercentage: 95,
    type: "Internship",
  },
  {
    title: "AI Research Internship",
    company: "NexGen Labs",
    location: "Remote",
    salary: "Unpaid",
    deadline: "28 Dec 2024",
    matchPercentage: 85,
    type: "Internship",
  },
];

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth if not authenticated
    if (!auth.token || !auth.user) {
      navigate("/auth?mode=login");
    }
  }, [auth.token, auth.user, navigate]);

  // Get user initials from name
  const getInitials = (fullName?: string) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" />
              <AvatarFallback>{getInitials(auth.user?.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {auth.user?.fullName || "User"}
              </h1>
              <p className="text-muted-foreground">B.Tech in Computer Science</p>
              <p className="text-sm text-muted-foreground">{auth.user?.email}</p>
            </div>
          </div>
          <Link to="/edit-profile">
            <Button>Edit Profile</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Briefcase}
            value={12}
            label="Opportunities Recommended"
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
          />
          <StatCard
            icon={FileText}
            value={4}
            label="Applications Submitted"
            iconBgColor="bg-success/10"
            iconColor="text-success"
          />
          <StatCard
            icon={Star}
            value={1}
            label="Shortlisted"
            iconBgColor="bg-amber-500/10"
            iconColor="text-amber-500"
          />
          <StatCard
            icon={Clock}
            value={3}
            label="Deadlines This Week"
            iconBgColor="bg-muted"
            iconColor="text-muted-foreground"
          />
        </div>

        {/* Recommended Opportunities */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Recommended Opportunities
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Progress value={76} className="w-24 h-2" />
                <span className="text-success font-medium">76% completed</span>
                <span className="text-muted-foreground">– add resume</span>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {opportunities.map((opportunity, index) => (
              <OpportunityCard key={index} {...opportunity} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
