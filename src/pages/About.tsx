import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Users,
  Zap,
  TrendingUp,
  Award,
  Heart,
  Briefcase,
  BookOpen,
  Handshake,
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering students and companies through meaningful career connections",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive ecosystem where everyone can thrive together",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging technology to create smarter placement solutions",
    },
    {
      icon: Heart,
      title: "Trust & Integrity",
      description: "Operating with transparency and genuine commitment to all stakeholders",
    },
  ];

  const stats = [
    { number: "5000+", label: "Students Trained", icon: BookOpen },
    { number: "92%", label: "Placement Rate", icon: TrendingUp },
    { number: "500+", label: "Partner Companies", icon: Briefcase },
    { number: "150+", label: "Expert Mentors", icon: Award },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Vyoma Placement Cell</title>
        <meta
          name="description"
          content="Learn about Vyoma Placement Cell - empowering students and companies through career connections and growth opportunities."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                About Vyoma
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're revolutionizing the placement process by connecting talented students with
                exceptional companies, guided by experienced mentors who believe in their potential.
              </p>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm border border-gray-100 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Vyoma was founded with a simple yet powerful vision: to bridge the gap between
                  talented students and the companies that need them. We recognized that the traditional
                  placement process was broken, often leaving both students and employers frustrated.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Today, Vyoma stands as a trusted platform serving thousands of students, hundreds of
                  companies, and a passionate community of mentors. We've helped transform careers and
                  built a thriving ecosystem where everyone wins.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our commitment remains unchanged: to empower the next generation of professionals and
                  create meaningful career opportunities that truly matter.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 border border-blue-200 flex items-center justify-center min-h-80">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Handshake className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-800 font-semibold text-lg">Building Connections</p>
                  <p className="text-gray-600 text-sm mt-2">That Change Lives</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Mission & Vision */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-white rounded-xl shadow-sm border border-gray-100 p-10">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower students with skills, mentorship, and opportunities while helping companies
                  find and nurture exceptional talent. We believe that with the right connections and
                  guidance, everyone can achieve their career aspirations.
                </p>
              </Card>

              <Card className="bg-white rounded-xl shadow-sm border border-gray-100 p-10">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the world's most trusted platform for connecting students, companies, and
                  mentors. We envision a future where career growth is accessible, transparent, and
                  mutually beneficial for all stakeholders.
                </p>
              </Card>
            </div>
          </section>

          {/* Stats Section */}
          <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-12 mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="flex justify-center mb-4">
                      <Icon className="w-8 h-8 text-blue-100" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Core Values */}
          <section className="container mx-auto px-4 py-16 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={idx}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-8"
                  >
                    <Icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-12 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Holistic Approach</h3>
                <p className="text-gray-700">
                  We focus on developing the complete professional, not just matching resumes. Skills,
                  personality, and career goals all matter.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Mentorship</h3>
                <p className="text-gray-700">
                  Our network of 150+ industry mentors provides personalized guidance and real-world
                  insights that textbooks can't teach.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Company Partnerships</h3>
                <p className="text-gray-700">
                  We work with 500+ companies who trust our process and value the candidates we help
                  prepare.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a student looking to grow, a company seeking talent, or a mentor ready to
              guide others, we'd love to have you join the Vyoma community.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/auth?mode=signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg rounded-lg"
              >
                Join as Student
              </Button>
              <Button
                onClick={() => navigate("/extras")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold px-8 py-3 text-lg rounded-lg"
              >
                Explore Opportunities
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default About;
