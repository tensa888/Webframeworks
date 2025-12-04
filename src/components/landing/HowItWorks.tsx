const steps = [
  {
    number: "1",
    title: "Create Profile",
    description: "Add your academic details, skills, and achievements",
  },
  {
    number: "2",
    title: "Get Recommendations",
    description: "Receive personalized internship suggestions based on your profile",
  },
  {
    number: "3",
    title: "Apply Easily",
    description: "One-click applications with your saved profile and resume",
  },
  {
    number: "4",
    title: "Track Progress",
    description: "Monitor your application status from submission to selection",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Get started in just a few simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
