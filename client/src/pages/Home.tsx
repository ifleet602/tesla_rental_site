import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Zap, Shield, Clock, Star, ChevronRight, 
  Battery, Gauge, Car, Users, MapPin, CheckCircle2
} from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Clock, label: "24/7 Support" },
  { icon: Zap, label: "Instant Booking" },
];

const vehicles = [
  {
    model: "Tesla Model 3",
    year: 2024,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
    dailyRate: 149,
    range: "333 miles",
    acceleration: "3.1s 0-60",
    features: ["Autopilot", "Premium Audio", "Glass Roof"],
  },
  {
    model: "Tesla Model Y",
    year: 2025,
    image: "https://images.unsplash.com/photo-1619317190096-c5e9b1c8c0d9?w=600&h=400&fit=crop",
    dailyRate: 179,
    range: "330 miles",
    acceleration: "3.5s 0-60",
    features: ["7 Seats", "Autopilot", "Panoramic Roof"],
  },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "50+", label: "Vehicles" },
  { value: "4.9", label: "Average Rating" },
  { value: "24/7", label: "Support" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-3 w-3 mr-1" />
                Premium EV Rentals in Chandler, AZ
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Premium Tesla
                <span className="text-primary block">Rentals</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Experience the future of driving with our fleet of Tesla vehicles. 
                Book your Model 3 or Model Y today and enjoy the ultimate electric driving experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    Book Your Tesla
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/franchise">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                    Franchise Info
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                {trustBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <badge.icon className="h-4 w-4 text-primary" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop"
                  alt="Tesla Model 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">From $149/day</div>
                <div className="text-sm opacity-90">All-inclusive pricing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Drive Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Drive?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our premium Tesla fleet. Each vehicle comes fully charged, 
              cleaned, and ready for your adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.model} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{vehicle.model}</h3>
                      <p className="text-muted-foreground">{vehicle.year}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${vehicle.dailyRate}</div>
                      <div className="text-sm text-muted-foreground">per day</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Battery className="h-4 w-4 text-primary" />
                      <span>{vehicle.range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="h-4 w-4 text-primary" />
                      <span>{vehicle.acceleration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {vehicle.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Link href="/book">
                    <Button className="w-full">
                      Book Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/fleet">
              <Button variant="outline" size="lg">
                View Full Fleet
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Renting a Tesla has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Choose Your Tesla", desc: "Browse our fleet and select your preferred model", icon: Car },
              { step: 2, title: "Pick Your Dates", desc: "Select your rental dates using our booking calendar", icon: Clock },
              { step: 3, title: "Drive & Enjoy", desc: "Pick up your fully charged Tesla and hit the road", icon: Zap },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary text-primary-foreground">
                <Users className="h-3 w-3 mr-1" />
                Franchise Opportunity
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Own the Future of EV Rentals
              </h2>
              <p className="text-lg opacity-80">
                Join the IFLEET602 franchise network and build a profitable Tesla rental 
                business in your territory. We provide the brand, technology, and proven playbook.
              </p>
              <ul className="space-y-3">
                {[
                  "Exclusive territory rights",
                  "Comprehensive training program",
                  "Marketing & technology support",
                  "Projected ROI within 18 months",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/franchise">
                  <Button size="lg" className="w-full sm:w-auto">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/apply">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-background/30 hover:bg-background/10">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=600&fit=crop"
                  alt="Tesla charging"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-xl">
                <MapPin className="h-6 w-6 mb-1" />
                <div className="text-sm font-medium">Arizona Territories Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
