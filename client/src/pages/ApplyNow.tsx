import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { FileText, CheckCircle2, Clock, Phone, Zap } from "lucide-react";

const investmentRanges = [
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "$200,000 - $250,000",
  "$250,000 - $300,000",
  "$300,000+",
];

const states = [
  "Arizona",
  "California",
  "Nevada",
  "Texas",
  "Other",
];

export default function ApplyNow() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    investmentCapital: "",
    businessExperience: "",
    whyInterested: "",
  });

  const submitApplication = trpc.franchise.submit.useMutation({
    onSuccess: () => {
      toast.success("Application submitted successfully! We'll be in touch within 48 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        investmentCapital: "",
        businessExperience: "",
        whyInterested: "",
      });
    },
    onError: () => {
      toast.error("Failed to submit application. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication.mutate(formData);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-background to-muted">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            <FileText className="h-3 w-3 mr-1" />
            Franchise Application
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply Now</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take the first step toward owning your IFLEET602 franchise. 
            Complete the application below and our team will contact you within 48 hours.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Franchise Application Form</CardTitle>
                  <CardDescription>
                    Please provide accurate information to help us evaluate your application.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(602) 555-1234"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Location</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Phoenix"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Select
                            value={formData.state}
                            onValueChange={(value) => setFormData({ ...formData, state: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Investment */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Investment Capacity</h3>
                      <div className="space-y-2">
                        <Label htmlFor="investment">Available Investment Capital</Label>
                        <Select
                          value={formData.investmentCapital}
                          onValueChange={(value) => setFormData({ ...formData, investmentCapital: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select investment range" />
                          </SelectTrigger>
                          <SelectContent>
                            {investmentRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Background</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Business Experience</Label>
                          <Textarea
                            id="experience"
                            value={formData.businessExperience}
                            onChange={(e) => setFormData({ ...formData, businessExperience: e.target.value })}
                            placeholder="Tell us about your business background, management experience, and any relevant industry experience..."
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interest">Why IFLEET602?</Label>
                          <Textarea
                            id="interest"
                            value={formData.whyInterested}
                            onChange={(e) => setFormData({ ...formData, whyInterested: e.target.value })}
                            placeholder="What interests you about the IFLEET602 franchise opportunity? What are your goals?"
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={!isFormValid || submitApplication.isPending}
                    >
                      {submitApplication.isPending ? "Submitting..." : "Submit Application"}
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this application, you agree to be contacted by our franchise development team.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: 1, text: "We review your application within 48 hours" },
                    { step: 2, text: "A franchise advisor contacts you for a discovery call" },
                    { step: 3, text: "You receive our Franchise Disclosure Document" },
                    { step: 4, text: "We schedule an in-person or virtual meeting" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <p className="text-sm">{item.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Prefer to Talk?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our franchise development team is available to answer your questions.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">(602) 555-FLEET</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm MST</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <Zap className="h-8 w-8 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Limited Territories</h3>
                  <p className="text-sm opacity-90">
                    Prime Arizona territories are going fast. Apply today to secure your 
                    exclusive market before it's taken.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
