import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { Helmet } from "react-helmet-async";
import { Search, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  description: string;
  isHiring: boolean;
  alumniCount: number;
  location: string;
}

// Sample company data
const companiesData: Company[] = [
  {
    id: 1,
    name: "Tech Innovations Inc.",
    logo: "https://via.placeholder.com/80?text=TechInov",
    industry: "Software",
    description: "Leading provider of cloud infrastructure and AI solutions for enterprises worldwide.",
    isHiring: true,
    alumniCount: 24,
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Digital Solutions Ltd.",
    logo: "https://via.placeholder.com/80?text=Digital",
    industry: "FinTech",
    description: "Revolutionizing financial technology with innovative digital payment platforms.",
    isHiring: true,
    alumniCount: 18,
    location: "New York, NY",
  },
  {
    id: 3,
    name: "Analytics Corp",
    logo: "https://via.placeholder.com/80?text=Analytics",
    industry: "Data Science",
    description: "Advanced data analytics and business intelligence solutions for global enterprises.",
    isHiring: false,
    alumniCount: 12,
    location: "Boston, MA",
  },
  {
    id: 4,
    name: "Cloud Systems",
    logo: "https://via.placeholder.com/80?text=Cloud",
    industry: "Cloud Computing",
    description: "Cutting-edge cloud infrastructure and DevOps services for startups and enterprises.",
    isHiring: true,
    alumniCount: 31,
    location: "Seattle, WA",
  },
  {
    id: 5,
    name: "Creative Studio",
    logo: "https://via.placeholder.com/80?text=Creative",
    industry: "Design & UX",
    description: "Premium design studio creating world-class digital experiences and branding solutions.",
    isHiring: true,
    alumniCount: 15,
    location: "Los Angeles, CA",
  },
  {
    id: 6,
    name: "Infrastructure Pro",
    logo: "https://via.placeholder.com/80?text=Infra",
    industry: "DevOps",
    description: "Enterprise infrastructure automation and monitoring for mission-critical systems.",
    isHiring: false,
    alumniCount: 22,
    location: "Chicago, IL",
  },
];

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => (
  <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
    {/* Card Header with Logo and Status Badge */}
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between mb-4">
        <img
          src={company.logo}
          alt={company.name}
          className="w-16 h-16 rounded-lg object-cover bg-gray-100"
        />
        <div className="flex items-center gap-2">
          {company.isHiring ? (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                Hiring
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                Not Hiring
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Company Name and Industry */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{company.name}</h3>
      <p className="text-sm text-blue-600 font-semibold mb-3">{company.industry}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{company.description}</p>

      {/* Alumni Badge */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100">
          <Users size={16} />
          <span className="text-sm font-semibold">{company.alumniCount} Alumni work here</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
        <MapPin size={16} />
        <span>{company.location}</span>
      </div>
    </div>

    {/* Card Footer - Button */}
    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
      <Button
        variant="outline"
        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
      >
        View Profile
      </Button>
    </div>
  </Card>
);

const Companies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = companiesData.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query)
    );
    setFilteredCompanies(filtered);
  };

  return (
    <>
      <Helmet>
        <title>Companies - Vyoma Placement Cell</title>
        <meta
          name="description"
          content="Explore our hiring partners and discover companies offering internships and placements."
        />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        <main className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Our Hiring Partners</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with leading companies actively hiring fresh talent. Explore opportunities with our network of hiring partners.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search companies by name or industry..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>
          </div>

          {/* Company Grid */}
          <div className="mb-20">
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600">
                  No companies found matching "{searchQuery}". Try a different search.
                </p>
              </div>
            )}
          </div>

          {/* Recruiter CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Want to hire top talent?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join our network of leading companies and connect with passionate, skilled students ready to make an impact.
            </p>
            <Button
              onClick={() => navigate("/company-signup")}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg rounded-lg"
            >
              Register as Company
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Companies;
