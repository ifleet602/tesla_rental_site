import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CalendarDays, Car, CreditCard, CheckCircle2, Zap, Loader2, Shield, AlertCircle } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInDays, format } from "date-fns";
import { useLocation } from "wouter";

const vehicles = [
  { id: 1, name: "Tesla Model 3 Long Range", dailyRate: 149 },
  { id: 2, name: "Tesla Model Y Performance", dailyRate: 179 },
];

const SECURITY_DEPOSIT = 250;

const faqs = [
  {
    question: "What's included in the rental price?",
    answer: "All rentals include unlimited miles, full insurance coverage, 24/7 roadside assistance, and a fully charged battery at pickup. We also provide a mobile charger for your convenience.",
  },
  {
    question: "What do I need to rent a Tesla?",
    answer: "You'll need a valid driver's license, be at least 25 years old, and have a credit card for the security deposit. We'll verify your driving record during the booking process.",
  },
  {
    question: "How does charging work?",
    answer: "Your Tesla comes with access to the Supercharger network. We recommend returning the vehicle with at least 80% charge. Charging costs at Superchargers are included in your rental.",
  },
  {
    question: "What's the cancellation policy?",
    answer: "Free cancellation up to 48 hours before pickup. Cancellations within 48 hours are subject to a one-day rental fee. No-shows forfeit the full rental amount.",
  },
  {
    question: "Can I take the Tesla out of state?",
    answer: "Yes! You can drive anywhere within the continental United States. Just let us know your travel plans so we can ensure you have access to Superchargers along your route.",
  },
  {
    question: "What happens if I have an accident?",
    answer: "Our comprehensive insurance covers most incidents. In case of an accident, contact us immediately at our 24/7 support line. We'll guide you through the process and arrange a replacement vehicle if needed.",
  },
];

export default function BookTesla() {
  const [, setLocation] = useLocation();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });
  const [bookingStep, setBookingStep] = useState<"form" | "processing" | "checkout">("form");

  // Check for cancelled payment on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cancelled") === "true") {
      toast.error("Payment was cancelled. You can try again when ready.");
      // Clear the URL parameter
      window.history.replaceState({}, "", "/book");
    }
  }, []);

  const createBooking = trpc.bookings.create.useMutation();
  const createCheckout = trpc.bookings.createCheckout.useMutation();
  
  // Check availability when dates and vehicle are selected
  const { data: availability, isLoading: checkingAvailability } = trpc.bookings.checkAvailability.useQuery(
    {
      vehicleId: parseInt(selectedVehicle),
      startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "",
      endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "",
    },
    {
      enabled: !!selectedVehicle && !!dateRange?.from && !!dateRange?.to,
    }
  );

  const selectedVehicleData = vehicles.find(v => v.id.toString() === selectedVehicle);
  const days = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0;
  const rentalPrice = selectedVehicleData ? days * selectedVehicleData.dailyRate : 0;
  const totalPrice = rentalPrice + SECURITY_DEPOSIT;

  const isAvailable = availability?.available !== false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateRange?.from || !dateRange?.to || !selectedVehicle) {
      toast.error("Please select dates and a vehicle");
      return;
    }

    if (!isAvailable) {
      toast.error("This vehicle is not available for the selected dates");
      return;
    }

    setBookingStep("processing");

    try {
      // Step 1: Create the booking
      const booking = await createBooking.mutateAsync({
        vehicleId: parseInt(selectedVehicle),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: format(dateRange.to, "yyyy-MM-dd"),
        totalPrice: totalPrice.toString(),
        notes: formData.notes,
      });

      // Step 2: Create Stripe checkout session
      const checkout = await createCheckout.mutateAsync({
        bookingId: booking.id,
      });

      // Step 3: Redirect to Stripe Checkout
      toast.info("Redirecting to secure payment...");
      window.open(checkout.checkoutUrl, "_blank");
      
      setBookingStep("checkout");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to process booking. Please try again.");
      setBookingStep("form");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-background to-muted">
        <div className="container text-center">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Easy Online Booking
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Tesla</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your dates, choose your vehicle, and get ready for an unforgettable driving experience.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container">
          {bookingStep === "checkout" ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="py-12 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Complete Your Payment</h2>
                <p className="text-muted-foreground mb-6">
                  A new tab has opened with our secure payment page. Complete your payment there to confirm your booking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setBookingStep("form")} variant="outline">
                    Start New Booking
                  </Button>
                  <Button onClick={() => setLocation("/")}>
                    Return Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar & Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Step 1: Select Dates */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5" />
                          Select Your Dates
                        </CardTitle>
                        <CardDescription>Choose your pickup and return dates</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                    {dateRange?.from && dateRange?.to && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="text-sm">
                          <strong>Pickup:</strong> {format(dateRange.from, "MMMM d, yyyy")}
                        </p>
                        <p className="text-sm">
                          <strong>Return:</strong> {format(dateRange.to, "MMMM d, yyyy")}
                        </p>
                        <p className="text-sm font-medium text-primary mt-2">
                          {days} day{days !== 1 ? 's' : ''} rental
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Step 2: Select Vehicle */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Car className="h-5 w-5" />
                          Choose Your Tesla
                        </CardTitle>
                        <CardDescription>Select from our premium fleet</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                            {vehicle.name} - ${vehicle.dailyRate}/day
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Availability indicator */}
                    {selectedVehicle && dateRange?.from && dateRange?.to && (
                      <div className="mt-4">
                        {checkingAvailability ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Checking availability...</span>
                          </div>
                        ) : isAvailable ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Available for selected dates</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Not available for selected dates</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Step 3: Your Details */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Your Details
                        </CardTitle>
                        <CardDescription>Enter your contact information</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.customerEmail}
                            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                          placeholder="(602) 555-1234"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Special Requests (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any special requests or notes..."
                          rows={3}
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedVehicleData ? (
                      <>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="font-medium">{selectedVehicleData.name}</p>
                          <p className="text-sm text-muted-foreground">${selectedVehicleData.dailyRate}/day</p>
                        </div>
                        {days > 0 && (
                          <>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Daily Rate</span>
                                <span>${selectedVehicleData.dailyRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Number of Days</span>
                                <span>{days}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Rental Subtotal</span>
                                <span>${rentalPrice}</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Security Deposit (refundable)</span>
                                <span>${SECURITY_DEPOSIT}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Insurance</span>
                                <span className="text-green-600">Included</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Unlimited Miles</span>
                                <span className="text-green-600">Included</span>
                              </div>
                            </div>
                            <div className="border-t pt-4">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">${totalPrice}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Includes ${SECURITY_DEPOSIT} refundable deposit
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <p className="text-muted-foreground text-sm">Select a vehicle to see pricing</p>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSubmit}
                      disabled={
                        !dateRange?.from || 
                        !dateRange?.to || 
                        !selectedVehicle || 
                        !formData.customerName || 
                        !formData.customerEmail || 
                        !formData.customerPhone || 
                        !isAvailable ||
                        bookingStep === "processing"
                      }
                    >
                      {bookingStep === "processing" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Payment
                          <CreditCard className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3 w-3" />
                      <span>Secure payment via Stripe</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Rental FAQ</h2>
            <p className="text-muted-foreground">Common questions about renting with IFLEET602</p>
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

      <Footer />
    </div>
  );
}
