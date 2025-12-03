import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { z } from "zod";

const editProfileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").optional().or(z.literal("")),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EditProfileFormData>({
    fullName: auth.user?.fullName || "",
    username: auth.user?.username || "",
  });
  const [errors, setErrors] = useState<Partial<EditProfileFormData>>({});

  useEffect(() => {
    if (!auth.token || !auth.user) {
      navigate("/auth?mode=login");
    }
  }, [auth.token, auth.user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof EditProfileFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = editProfileSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<EditProfileFormData> = {};
      result.error.errors.forEach((err) => {
        const path = err.path[0] as keyof EditProfileFormData;
        newErrors[path] = err.message as any;
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error || "Failed to update profile",
          variant: "destructive",
        });
        return;
      }

      // Update auth context with new user data
      auth.signIn(auth.token!, {
        ...auth.user!,
        fullName: data.user.fullName,
        username: data.user.username,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto pt-10 px-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={isLoading}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your username (optional)"
                  disabled={isLoading}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
