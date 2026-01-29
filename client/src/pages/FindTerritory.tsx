import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MapPin, Users, DollarSign, ChevronRight, CheckCircle2, Clock } from "lucide-react";

const territories = [
  {
    id: 1,
    name: "Phoenix Metro - North",
    city: "Phoenix",
    status: "available",
    population: "450,000+",
    investment: "$200K - $250K",
    projectedRevenue: "$450K - $550K",
  },
  {
    id: 2,
    name: "Scottsdale",
    city: "Scottsdale",
    status: "available",
    population: "250,000+",
    investment: "$175K - $225K",
    projectedRevenue: "$400K - $500K",
  },
  {
    id: 3,
    name: "Tempe / Mesa",
    city: "Tempe",
    status: "pending",
    population: "380,000+",
    investment: "$180K - $230K",
    projectedRevenue: "$420K - $520K",
  },
  {
    id: 4,
    name: "Gilbert / Chandler",
    city: "Gilbert",
    status: "sold",
    population: "320,000+",
    investment: "N/A",
    projectedRevenue: "N/A",
  },
  {
    id: 5,
    name: "Tucson Metro",
    city: "Tucson",
    status: "available",
    population: "550,000+",
    investment: "$200K - $275K",
    projectedRevenue: "$480K - $600K",
  },
  {
    id: 6,
    name: "Flagstaff",
    city: "Flagstaff",
    status: "available",
    population: "75,000+",
    investment: "$150K - $200K",
    projectedRevenue: "$300K - $400K",
  },
];

const statusColors = {
  available: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  sold: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  available: "Available",
  pending: "Under Review",
  sold: "Sold",
};

export default function FindTerritory() {
  const availableTerritories = territories.filter(t => t.status === "available");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-background to-muted">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            <MapPin className="h-3 w-3 mr-1" />
            Territory Finder
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Territory</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore available franchise territories across Arizona. Each territory offers 
            exclusive rights to operate an IFLEET602 franchise in that market.
          </p>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12">
        <div className="container">
          <Card className="overflow-hidden">
            <div className="aspect-[16/9] bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Interactive Territory Map</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Our interactive map is being updated with the latest territory information. 
                    Browse available territories below or contact us for a personalized consultation.
                  </p>
                  <Link href="/apply">
                    <Button>
                      Request Territory Info
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Decorative map background */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop&q=50"
                alt="Map background"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Territory Cards */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Arizona Territories</h2>
              <p className="text-muted-foreground">
                {availableTerritories.length} territories currently available
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Updated Jan 2026
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {territories.map((territory) => (
              <Card key={territory.id} className={territory.status === "sold" ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{territory.name}</CardTitle>
                    <Badge className={statusColors[territory.status as keyof typeof statusColors]}>
                      {statusLabels[territory.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {territory.city}, Arizona
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{territory.population}</div>
                        <div className="text-xs text-muted-foreground">Population</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{territory.investment}</div>
                        <div className="text-xs text-muted-foreground">Investment</div>
                      </div>
                    </div>
                  </div>

                  {territory.status !== "sold" && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Projected Annual Revenue</div>
                      <div className="font-bold text-primary">{territory.projectedRevenue}</div>
                    </div>
                  )}

                  {territory.status === "available" && (
                    <Link href="/apply">
                      <Button className="w-full">
                        Apply for Territory
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}

                  {territory.status === "pending" && (
                    <Button variant="outline" className="w-full" disabled>
                      Under Review
                    </Button>
                  )}

                  {territory.status === "sold" && (
                    <Button variant="ghost" className="w-full" disabled>
                      Territory Sold
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Territory Matters */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Territory Matters</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your exclusive territory is the foundation of your franchise success. 
                We carefully design each territory to maximize your earning potential 
                while ensuring sustainable growth.
              </p>
              <ul className="space-y-4">
                {[
                  "Exclusive rights to operate in your designated area",
                  "Protected from competition by other IFLEET602 franchisees",
                  "Territory size based on population and demand analysis",
                  "Flexibility to expand as your business grows",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Don't See Your Area?</h3>
              <p className="opacity-90 mb-6">
                We're actively expanding into new markets. If you're interested in a 
                territory not listed here, let us know. We may be able to develop a 
                new territory based on your location.
              </p>
              <Link href="/apply">
                <Button variant="secondary" size="lg" className="w-full">
                  Request Custom Territory
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
