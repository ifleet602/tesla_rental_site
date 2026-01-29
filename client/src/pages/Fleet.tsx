import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Battery, Gauge, ChevronRight, Zap, Users, Snowflake, Music, Wifi } from "lucide-react";

const vehicles = [
  {
    id: 1,
    model: "Tesla Model 3",
    variant: "Long Range",
    year: 2024,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=500&fit=crop",
    dailyRate: 149,
    weeklyRate: 899,
    range: "333 miles",
    acceleration: "3.1s 0-60",
    topSpeed: "162 mph",
    seats: 5,
    features: ["Autopilot", "Premium Audio", "Glass Roof", "Heated Seats", "Wireless Charging"],
    description: "The Model 3 delivers exceptional performance with a sleek design. Perfect for daily commutes or weekend getaways.",
  },
  {
    id: 2,
    model: "Tesla Model Y",
    variant: "Performance",
    year: 2025,
    image: "https://images.unsplash.com/photo-1619317190096-c5e9b1c8c0d9?w=800&h=500&fit=crop",
    dailyRate: 179,
    weeklyRate: 1099,
    range: "330 miles",
    acceleration: "3.5s 0-60",
    topSpeed: "155 mph",
    seats: 7,
    features: ["7 Seats", "Autopilot", "Panoramic Roof", "Premium Audio", "Camp Mode"],
    description: "The Model Y combines SUV utility with Tesla performance. Ideal for families or those needing extra cargo space.",
  },
];

const featureIcons: Record<string, typeof Zap> = {
  "Autopilot": Zap,
  "Premium Audio": Music,
  "Heated Seats": Snowflake,
  "Wireless Charging": Wifi,
  "7 Seats": Users,
};

export default function Fleet() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-background to-muted">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Premium Fleet
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tesla Fleet</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the pinnacle of electric vehicle technology. Each Tesla in our fleet 
            is meticulously maintained and fully equipped for your comfort.
          </p>
        </div>
      </section>

      {/* Vehicle Cards */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-12">
            {vehicles.map((vehicle, index) => (
              <Card key={vehicle.id} className="overflow-hidden">
                <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <Badge className="mb-2">{vehicle.year}</Badge>
                        <h2 className="text-3xl font-bold">{vehicle.model}</h2>
                        <p className="text-lg text-muted-foreground">{vehicle.variant}</p>
                      </div>

                      <p className="text-muted-foreground">{vehicle.description}</p>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <Battery className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{vehicle.range}</div>
                          <div className="text-xs text-muted-foreground">Range</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <Gauge className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{vehicle.acceleration}</div>
                          <div className="text-xs text-muted-foreground">0-60 mph</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <Zap className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{vehicle.topSpeed}</div>
                          <div className="text-xs text-muted-foreground">Top Speed</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{vehicle.seats} Seats</div>
                          <div className="text-xs text-muted-foreground">Capacity</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature) => (
                          <Badge key={feature} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Pricing & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary">${vehicle.dailyRate}</span>
                            <span className="text-muted-foreground">/day</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Weekly: ${vehicle.weeklyRate}
                          </div>
                        </div>
                        <Link href="/book">
                          <Button size="lg">
                            Book Now
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Tesla?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Book your Tesla today and discover why electric is the future of driving.
          </p>
          <Link href="/book">
            <Button size="lg" variant="secondary">
              Book Your Tesla
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
