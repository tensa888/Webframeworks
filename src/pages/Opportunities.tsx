import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Helmet } from "react-helmet-async";

interface InternshipOpportunity {
  id: number;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  tags: string[];
  description?: string;
}

interface PlacementSuccess {
  id: number;
  studentName: string;
  studentPhoto: string;
  company: string;
  role: string;
}

// Sample data for internship opportunities
const internshipOpportunities: InternshipOpportunity[] = [
  {
    id: 1,
    jobTitle: "Software Engineer Intern",
    companyName: "Tech Innovations Inc.",
    companyLogo: "https://via.placeholder.com/60?text=Tech",
    tags: ["Full-time", "Paid", "Remote"],
  },
  {
    id: 2,
    jobTitle: "Frontend Developer Intern",
    companyName: "Digital Solutions Ltd.",
    companyLogo: "https://via.placeholder.com/60?text=Digital",
    tags: ["Full-time", "Paid", "On-site"],
  },
  {
    id: 3,
    jobTitle: "Data Analyst Intern",
    companyName: "Analytics Corp",
    companyLogo: "https://via.placeholder.com/60?text=Analytics",
    tags: ["Part-time", "Paid", "Remote"],
  },
  {
    id: 4,
    jobTitle: "Backend Developer Intern",
    companyName: "Cloud Systems",
    companyLogo: "https://via.placeholder.com/60?text=Cloud",
    tags: ["Full-time", "Paid", "Hybrid"],
  },
  {
    id: 5,
    jobTitle: "UX/UI Designer Intern",
    companyName: "Creative Studio",
    companyLogo: "https://via.placeholder.com/60?text=Creative",
    tags: ["Full-time", "Paid", "On-site"],
  },
  {
    id: 6,
    jobTitle: "DevOps Engineer Intern",
    companyName: "Infrastructure Pro",
    companyLogo: "https://via.placeholder.com/60?text=Infra",
    tags: ["Full-time", "Paid", "Remote"],
  },
];

// Sample data for placement successes
const placementSuccesses: PlacementSuccess[] = [
  {
    id: 1,
    studentName: "Raj Kumar",
    studentPhoto: "https://via.placeholder.com/150?text=Raj",
    company: "Google",
    role: "Software Engineer",
  },
  {
    id: 2,
    studentName: "Priya Singh",
    studentPhoto: "https://via.placeholder.com/150?text=Priya",
    company: "Microsoft",
    role: "Product Manager",
  },
  {
    id: 3,
    studentName: "Arjun Patel",
    studentPhoto: "https://via.placeholder.com/150?text=Arjun",
    company: "Amazon",
    role: "Cloud Architect",
  },
  {
    id: 4,
    studentName: "Anjali Sharma",
    studentPhoto: "https://via.placeholder.com/150?text=Anjali",
    company: "Apple",
    role: "Design Lead",
  },
];

const InternshipCard = ({ opportunity }: { opportunity: InternshipOpportunity }) => (
  <Card className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4 mb-4">
      <img
        src={opportunity.companyLogo}
        alt={opportunity.companyName}
        className="w-14 h-14 rounded-lg object-cover bg-gray-200"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{opportunity.jobTitle}</h3>
        <p className="text-sm text-gray-600">{opportunity.companyName}</p>
      </div>
    </div>

    <div className="mb-4 flex flex-wrap gap-2">
      {opportunity.tags.map((tag, idx) => (
        <Badge key={idx} className="bg-blue-100 text-blue-700 font-medium">
          {tag}
        </Badge>
      ))}
    </div>

    <div className="flex justify-end">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
        Apply Now
      </Button>
    </div>
  </Card>
);

const PlacementSuccessCard = ({ success }: { success: PlacementSuccess }) => (
  <Card className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition-shadow">
    <div className="mb-4 flex justify-center">
      <img
        src={success.studentPhoto}
        alt={success.studentName}
        className="w-24 h-24 rounded-full object-cover bg-gray-200"
      />
    </div>
    <h4 className="text-lg font-bold text-gray-800 mb-2">{success.studentName}</h4>
    <p className="text-sm text-gray-600">
      Placed at <span className="font-semibold">{success.company}</span> - {success.role}
    </p>
  </Card>
);

const Opportunities = () => {
  return (
    <>
      <Helmet>
        <title>Opportunities - Vyoma Placement Cell</title>
        <meta
          name="description"
          content="Explore internship opportunities and view student placement successes at Vyoma Placement Cell."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="mb-16 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Opportunities</h1>
            <p className="text-lg text-gray-600 max-w-2xl">Discover internships and placements tailored for you</p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - 65% (2 columns on lg: 2 out of 3) */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 pb-2 border-b-3 border-blue-600 inline-block">
                  Internship Details
                </h2>
              </div>
              <div className="space-y-5">
                {internshipOpportunities.map((opportunity) => (
                  <InternshipCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </div>

            {/* Right Column - 35% (1 column on lg: 1 out of 3) */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 pb-2 border-b-3 border-blue-600 inline-block">
                  Placement Successes
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {placementSuccesses.map((success) => (
                  <PlacementSuccessCard key={success.id} success={success} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Opportunities;
