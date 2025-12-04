import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Users,
  Award,
  FileText,
  Mic2,
  Brain,
  Video,
  ArrowRight,
  Star,
} from "lucide-react";

type TabType = "partner" | "mentor" | "upscale";

// Partner Benefits Data
const partnerBenefits = [
  {
    id: 1,
    title: "Zero Hiring Fees",
    description: "No commission or hidden charges. Direct access to pre-screened talent.",
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: "Pre-screened Candidates",
    description: "All candidates are vetted and verified to ensure quality matches.",
    icon: Users,
  },
  {
    id: 3,
    title: "Campus Branding",
    description: "Build your brand with students and increase company visibility.",
    icon: Award,
  },
];

// Mentor Steps Data
const mentorSteps = [
  {
    id: 1,
    title: "Register",
    description: "Sign up as a mentor and tell us about your experience",
  },
  {
    id: 2,
    title: "Get Matched",
    description: "We connect you with students aligned to your expertise",
  },
  {
    id: 3,
    title: "Start Mentoring",
    description: "Guide students through their career journey",
  },
];

// Mentor Testimonial
const mentorTestimonial = {
  text: "Mentoring through Vyoma has been incredibly fulfilling. Seeing my mentees grow and succeed in their careers is the best reward.",
  author: "Sarah Johnson",
  role: "Senior Product Manager at Tech Innovations",
  avatar: "https://via.placeholder.com/60?text=SJ",
};

// Upscale Resources Data
const upscaleResources = [
  {
    id: 1,
    title: "Resume Builder",
    description: "Create ATS-friendly resumes",
    icon: FileText,
  },
  {
    id: 2,
    title: "Mock Interviews",
    description: "Practice with AI-powered interviews",
    icon: Mic2,
  },
  {
    id: 3,
    title: "Aptitude Tests",
    description: "Prepare for placement exams",
    icon: Brain,
  },
  {
    id: 4,
    title: "Webinars",
    description: "Learn from industry experts",
    icon: Video,
  },
];

// Tab Components
const PartnerTab = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Partner with Vyoma</h2>
        <p className="text-xl text-gray-600">Hire top talent and drive innovation</p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {partnerBenefits.map((benefit) => {
          const IconComponent = benefit.icon;
          return (
            <Card
              key={benefit.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100"
            >
              <IconComponent className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">Ready to hire top talent?</h3>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Join hundreds of companies already using Vyoma to build their teams.
        </p>
        <Button
          onClick={() => navigate("/company-signup")}
          className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg rounded-lg"
        >
          Register as Partner
        </Button>
      </div>
    </div>
  );
};

const MentorTab = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Shape the Future</h2>
        <p className="text-xl text-gray-600">Guide students through their career journey</p>
      </div>

      {/* Steps Process */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentorSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <Card className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold">
                      {step.id}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
              {index < mentorSteps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-16 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 border border-blue-200">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto">
          <img
            src={mentorTestimonial.avatar}
            alt={mentorTestimonial.author}
            className="w-20 h-20 rounded-full object-cover bg-gray-200"
          />
          <div>
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-800 text-lg italic mb-3">"{mentorTestimonial.text}"</p>
            <p className="font-bold text-gray-900">{mentorTestimonial.author}</p>
            <p className="text-sm text-gray-600">{mentorTestimonial.role}</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">Make an impact today</h3>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Help students achieve their career goals and grow together.
        </p>
        <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg rounded-lg">
          Join as Mentor
        </Button>
      </div>
    </div>
  );
};

const UpscaleTab = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Level Up Your Skills</h2>
        <p className="text-xl text-gray-600">
          Access resources to boost your career readiness and land your dream role
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {upscaleResources.map((resource) => {
          const IconComponent = resource.icon;
          return (
            <Card
              key={resource.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 group cursor-pointer"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <IconComponent className="w-12 h-12 text-blue-600 relative" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm">{resource.description}</p>
              <div className="mt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm">
                  Get Started
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Upscale?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Industry-expert created content</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Personalized learning paths</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Real-world project practice</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Success Stories</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-green-200">
              <span className="text-gray-700">Students Trained</span>
              <span className="font-bold text-xl text-green-600">5,000+</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-green-200">
              <span className="text-gray-700">Placement Rate</span>
              <span className="font-bold text-xl text-green-600">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Avg. Package Increase</span>
              <span className="font-bold text-xl text-green-600">35%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-semibold rounded-lg transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {children}
  </button>
);

// Main Extras Component
const Extras = () => {
  const [activeTab, setActiveTab] = useState<TabType>("partner");

  return (
    <>
      <Helmet>
        <title>Extras - Vyoma Placement Cell</title>
        <meta
          name="description"
          content="Explore partnership opportunities, mentorship programs, and student learning resources at Vyoma Placement Cell."
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        <main className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Explore More Opportunities</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover ways to grow with Vyoma - whether you're a company, mentor, or student
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-16 flex justify-center gap-4 flex-wrap">
            <TabButton
              active={activeTab === "partner"}
              onClick={() => setActiveTab("partner")}
            >
              Becoming Partner
            </TabButton>
            <TabButton
              active={activeTab === "mentor"}
              onClick={() => setActiveTab("mentor")}
            >
              Becoming Mentor
            </TabButton>
            <TabButton
              active={activeTab === "upscale"}
              onClick={() => setActiveTab("upscale")}
            >
              Upscale
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            {activeTab === "partner" && <PartnerTab />}
            {activeTab === "mentor" && <MentorTab />}
            {activeTab === "upscale" && <UpscaleTab />}
          </div>
        </main>
      </div>
    </>
  );
};

export default Extras;
