import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { 
  TrendingUp, Users, MapPin, Zap, CheckCircle2, 
  DollarSign, Shield, Headphones, ChevronRight, Building2
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "High Growth Market",
    description: "EV rentals are growing 40% year-over-year. Position yourself in the fastest-growing segment of the car rental industry.",
  },
  {
    icon: Shield,
    title: "Proven Business Model",
    description: "Our franchisees achieve profitability within 12-18 months with our tested operational playbook.",
  },
  {
    icon: Headphones,
    title: "Comprehensive Support",
    description: "From site selection to marketing, we provide ongoing support to ensure your success.",
  },
  {
    icon: DollarSign,
    title: "Multiple Revenue Streams",
    description: "Earn from daily rentals, weekly packages, corporate accounts, and special events.",
  },
];

const investmentDetails = [
  { label: "Initial Investment", value: "$150,000 - $300,000" },
  { label: "Franchise Fee", value: "$35,000" },
  { label: "Royalty Fee", value: "6% of gross revenue" },
  { label: "Marketing Fund", value: "2% of gross revenue" },
  { label: "Territory Population", value: "100,000+ minimum" },
  { label: "Projected ROI", value: "18-24 months" },
];

const steps = [
  { step: 1, title: "Submit Application", description: "Complete our online application form with your background and investment capacity." },
  { step: 2, title: "Discovery Call", description: "Speak with our franchise development team to learn more about the opportunity." },
  { step: 3, title: "Review FDD", description: "Receive and review our Franchise Disclosure Document with your advisors." },
  { step: 4, title: "Territory Selection", description: "Choose your exclusive territory from available markets." },
  { step: 5, title: "Training Program", description: "Complete our comprehensive 2-week training program." },
  { step: 6, title: "Grand Opening", description: "Launch your IFLEET602 franchise with our support team." },
];

const faqs = [
  {
    question: "What experience do I need to become a franchisee?",
    answer: "While automotive experience is helpful, it's not required. We look for entrepreneurs with strong business acumen, customer service orientation, and the drive to succeed. Our comprehensive training program will teach you everything you need to know about running a Tesla rental business.",
  },
  {
    question: "How much can I expect to earn?",
    answer: "Earnings vary based on location, fleet size, and operational efficiency. Our top-performing franchisees generate $500,000+ in annual revenue with 25-35% profit margins. We'll provide detailed financial projections during the discovery process.",
  },
  {
    question: "What territories are available?",
    answer: "We currently have territories available throughout Arizona, with expansion plans for Nevada, California, and Texas. Use our Territory Finder to see available markets in your area.",
  },
  {
    question: "How many vehicles do I need to start?",
    answer: "Most franchisees start with 3-5 vehicles and scale based on demand. We help you determine the optimal fleet size for your territory and provide guidance on vehicle acquisition and financing.",
  },
  {
    question: "What ongoing support do you provide?",
    answer: "We provide continuous support including marketing campaigns, booking technology, fleet management software, operational guidance, and access to our franchisee network. Our support team is available 7 days a week.",
  },
];

export default function FranchiseOpportunities() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90 text-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary text-primary-foreground">
                <Building2 className="h-3 w-3 mr-1" />
                Franchise Opportunity
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Own the Future of
                <span className="text-primary block">EV Rentals</span>
              </h1>
              <p className="text-lg opacity-80">
                Join the IFLEET602 franchise network and build a profitable Tesla rental 
                business in your exclusive territory. We provide the brand, technology, 
                and proven playbook for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/apply">
                  <Button size="lg" className="w-full sm:w-auto">
                    Apply Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/territory">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-background/30 hover:bg-background/10">
                    Find Your Territory
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop"
                alt="Tesla charging station"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                <div className="text-3xl font-bold">$500K+</div>
                <div className="text-sm opacity-90">Annual Revenue Potential</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why IFLEET602?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a brand that's revolutionizing the car rental industry with premium electric vehicles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Details */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Investment Overview</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our franchise model is designed for entrepreneurs ready to invest in the 
                future of transportation. Here's what you need to know:
              </p>
              <div className="space-y-4">
                {investmentDetails.map((item) => (
                  <div key={item.label} className="flex justify-between items-center p-4 bg-background rounded-lg">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-primary font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">What's Included</h3>
              <ul className="space-y-4">
                {[
                  "Exclusive territory rights",
                  "Comprehensive training program",
                  "Proprietary booking technology",
                  "Marketing launch package",
                  "Fleet acquisition guidance",
                  "Ongoing operational support",
                  "National brand recognition",
                  "Franchisee network access",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Path to Ownership</h2>
            <p className="text-lg text-muted-foreground">
              Our streamlined process gets you from application to grand opening
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((item) => (
              <Card key={item.step} className="p-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Franchise FAQ</h2>
            <p className="text-muted-foreground">Common questions from prospective franchisees</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Take the first step toward owning your IFLEET602 franchise. 
            Our team is ready to help you explore this exciting opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" variant="secondary">
                Apply Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/territory">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10">
                View Available Territories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
