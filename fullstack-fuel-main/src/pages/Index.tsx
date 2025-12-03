import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Vyoma Placement Cell - Your Gateway to Internships & Career Opportunities</title>
        <meta name="description" content="Find relevant internships, connect with top companies, and track your placement journey. Join students who found their dream opportunities through Vyoma Placement Cell." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
