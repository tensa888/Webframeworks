import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { Helmet } from "react-helmet-async";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanySignup = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
        console.log("Company signup submitted:", {
          email: formData.companyEmail,
          password: formData.password,
        });
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Signup Successful - Vyoma Placement Cell</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <Navbar />
          <main className="container mx-auto px-4 py-16 flex items-center justify-center">
            <div className="text-center max-w-md">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Account Created!</h1>
              <p className="text-lg text-gray-600 mb-2">
                Your company account has been created successfully.
              </p>
              <p className="text-gray-600 mb-8">
                You can now proceed to complete your company registration and start hiring talent.
              </p>
              <Button
                onClick={() => navigate("/company-register")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-3"
              >
                Continue to Company Registration
              </Button>
              <Button
                onClick={() => navigate("/companies")}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50"
              >
                Back to Companies
              </Button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Company Signup - Vyoma Placement Cell</title>
        <meta name="description" content="Create a company account to start hiring fresh talent through Vyoma Placement Cell." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Company Signup</h1>
              <p className="text-gray-600">Create your account to get started with hiring</p>
            </div>

            {/* Signup Form */}
            <Card className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Email *
                  </label>
                  <Input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    placeholder="company@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.companyEmail && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} /> {errors.companyEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} /> {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Password must contain at least 8 characters, 1 uppercase letter, and 1 number
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} /> {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/company-login")}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Login here
                  </button>
                </p>

                <p className="text-sm text-gray-500 text-center">
                  * Required fields
                </p>
              </form>
            </Card>

            {/* Info Section */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-700">
                <strong>What happens next?</strong>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                After signup, you'll complete your company registration and start posting job opportunities.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CompanySignup;
