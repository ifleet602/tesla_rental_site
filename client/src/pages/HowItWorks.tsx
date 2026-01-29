import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { 
  Search, CalendarCheck, Key, Zap, ChevronRight,
  CreditCard, Shield, Clock, MapPin, Battery, Headphones
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Our Fleet",
    description: "Explore our collection of Tesla Model 3 and Model Y vehicles. Each car is meticulously maintained and comes fully equipped with premium features.",
    details: [
      "View detailed specs and photos",
      "Compare daily and weekly rates",
      "Check real-time availability",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Select Your Dates",
    description: "Use our easy booking calendar to choose your pickup and return dates. See instant pricing and availability for your selected timeframe.",
    details: [
      "Flexible pickup and return times",
      "No minimum rental period",
      "Instant confirmation",
    ],
  },
  {
    icon: CreditCard,
    title: "Complete Your Booking",
    description: "Provide your details and secure your reservation. We accept all major credit cards and require a refundable security deposit.",
    details: [
      "Secure payment processing",
      "Refundable security deposit",
      "Free cancellation up to 48 hours",
    ],
  },
  {
    icon: Key,
    title: "Pick Up Your Tesla",
    description: "Arrive at our Chandler location to collect your fully charged Tesla. We'll walk you through all the features and answer any questions.",
    details: [
      "Convenient Chandler location",
      "Full vehicle orientation",
      "Mobile app setup assistance",
    ],
  },
  {
    icon: Zap,
    title: "Enjoy the Drive",
    description: "Hit the road and experience the thrill of electric driving. Access the Supercharger network and enjoy unlimited miles throughout your rental.",
    details: [
      "Unlimited mileage included",
      "Supercharger access included",
      "24/7 roadside assistance",
    ],
  },
  {
    icon: MapPin,
    title: "Return & Go",
    description: "Return your Tesla at the end of your rental. Simply drop off the vehicle and we'll handle the rest. Quick checkout, no hassle.",
    details: [
      "Easy drop-off process",
      "Flexible return times",
      "Instant deposit refund",
    ],
  },
];

const inclusions = [
  { icon: Shield, title: "Full Insurance", description: "Comprehensive coverage included in every rental" },
  { icon: Battery, title: "Supercharging", description: "Access to Tesla's Supercharger network" },
  { icon: Headphones, title: "24/7 Support", description: "Round-the-clock roadside assistance" },
  { icon: Clock, title: "Unlimited Miles", description: "No mileage restrictions on any rental" },
];

const faqs = [
  {
    question: "What documents do I need to rent?",
    answer: "You'll need a valid driver's license (held for at least 2 years), be at least 25 years old, and have a major credit card in your name for the security deposit.",
  },
  {
    question: "How do I charge the Tesla during my rental?",
    answer: "Your rental includes access to Tesla's Supercharger network. Simply plug in at any Supercharger location and charging costs are covered. We also provide a mobile connector for home or destination charging.",
  },
  {
    question: "What if I need to extend my rental?",
    answer: "No problem! Contact us at least 24 hours before your scheduled return to extend your rental. Extensions are subject to availability and will be charged at the current daily rate.",
  },
  {
    question: "Is there a mileage limit?",
    answer: "No! All our rentals include unlimited mileage. Drive as far as you want without worrying about extra charges.",
  },
  {
    question: "What happens if I have an issue during my rental?",
    answer: "Our 24/7 support team is always available. For minor issues, we can often resolve them remotely through the Tesla app. For emergencies, we'll dispatch roadside assistance or arrange a replacement vehicle.",
  },
  {
    question: "Can I take the Tesla on a road trip?",
    answer: "Absolutely! Our Teslas are perfect for road trips. We'll help you plan your route with Supercharger stops. Just let us know your travel plans so we can ensure you have everything you need.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-background to-muted">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Simple Process
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Renting a Tesla from IFLEET602 is simple, fast, and hassle-free. 
            Here's everything you need to know about the rental process.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={step.title} className="overflow-hidden">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`bg-muted aspect-[4/3] md:aspect-auto flex items-center justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <step.icon className="h-24 w-24 text-primary/20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Included</h2>
            <p className="text-muted-foreground">Every rental comes with these premium features at no extra cost</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {inclusions.map((item) => (
              <Card key={item.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about renting with us</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/50 rounded-lg border px-6">
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
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Tesla?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Book your Tesla today and discover why electric is the future of driving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" variant="secondary">
                Book Your Tesla
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/fleet">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10">
                View Our Fleet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
