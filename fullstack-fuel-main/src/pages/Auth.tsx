import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Eye, EyeOff, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import authImage from "@/assets/auth-image.jpg";
import { useAuth } from "@/lib/auth";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const urlBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const res = await fetch(`${urlBase}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Failed to send OTP",
          variant: "destructive",
        });
        return;
      }

      setOtpStep(true);
      toast({
        title: "Success",
        description: "OTP sent to your email!",
        variant: "default",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Network Error",
        description: "Failed to send OTP. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode) {
      toast({
        title: "Error",
        description: "Please enter the OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const urlBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const res = await fetch(`${urlBase}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Invalid OTP",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Email verified successfully!",
        variant: "default",
      });
      setEmailVerified(true);
      setOtpStep(false);
      setOtpCode("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Network Error",
        description: "Failed to verify OTP.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check email verification for signup
    if (mode === "signup" && !emailVerified) {
      toast({
        title: "Verification Required",
        description: "Please verify your email address before signing up. Send OTP to your email and enter the code.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const urlBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload: any = {
        email: formData.email,
        password: formData.password,
      };
      if (mode === "signup") {
        payload.fullName = formData.fullName;
        payload.username = formData.username;
      }

      const res = await fetch(`${urlBase}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Handle specific error cases
        if (res.status === 503) {
          toast({
            title: "Database Error",
            description: "The database is currently unavailable. Please try again later.",
            variant: "destructive",
          });
        } else if (res.status === 409) {
          toast({
            title: "Email Already in Use",
            description: data.message || "This email is already registered.",
            variant: "destructive",
          });
        } else if (res.status === 401) {
          toast({
            title: "Authentication Failed",
            description: data.message || "Invalid email or password.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: data.message || "An error occurred during authentication.",
            variant: "destructive",
          });
        }
        return;
      }

      // Successful authentication
      toast({
        title: "Success",
        description: mode === "signup" ? "Account created successfully!" : "Logged in successfully!",
        variant: "default",
      });

      // save token and update auth state
      if (data.token) {
        try {
          auth.signIn(data.token, data.user);
        } catch (e) {
          console.warn("Failed to save auth state", e);
        }
      }

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast({
        title: "Network Error",
        description: "Failed to connect to the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/login-hero.jpg"
          alt="Professional using tablet"
          onError={(e) => {
            // fallback to bundled asset if public file isn't present
            const target = e.currentTarget as HTMLImageElement;
            if (target && target.src.indexOf("login-hero.jpg") !== -1) {
              target.src = authImage;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
        <div className="absolute bottom-8 left-8 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Vyoma Placement Cell</span>
          </Link>
          <p className="text-lg max-w-md opacity-90">
            Join thousands of students who found their dream careers through Vyoma Placement Cell.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Vyoma Placement Cell</span>
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {mode === "login" ? "Welcome back" : "Sign Up"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === "login"
                ? "Enter your credentials to access your account"
                : "Create your account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    mode === "signup" && searchParams.get("type") === "company"
                      ? "enter company email"
                      : "Enter your email"
                  }
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading || (mode === "signup" && otpStep)}
                />
                {mode === "signup" && !otpStep && (
                  <Button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send OTP
                  </Button>
                )}
              </div>
            </div>

            {mode === "signup" && otpStep && (
              <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-900 mb-3">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email Verification</span>
                </div>
                <Label htmlFor="otp">Enter OTP from your email</Label>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    placeholder="000000"
                    maxLength="6"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otpCode.length !== 6}
                  >
                    Verify
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOtpStep(false)}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                  </label>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isLoading || (mode === "signup" && !emailVerified)}
            >
              {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {mode === "signup" && !emailVerified && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900">
                <span className="font-medium">📧 Email verification required</span>
                <br />
                Please send and verify your email before signing up.
              </p>
            </div>
          )}          <div className="text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                    setEmailVerified(false);
                    setOtpStep(false);
                    setOtpCode("");
                  }}
                  className="text-primary hover:underline font-medium"
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setEmailVerified(false);
                    setOtpStep(false);
                    setOtpCode("");
                  }}
                  className="text-primary hover:underline font-medium"
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
