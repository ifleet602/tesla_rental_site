import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Car, Mail, Phone, Loader2 } from "lucide-react";

export default function BookingSuccess() {
  const [, setLocation] = useLocation();
  const [bookingId, setBookingId] = useState<number | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("booking_id");
    if (id) {
      setBookingId(parseInt(id, 10));
    }
  }, []);

  const { data: paymentStatus, isLoading } = trpc.bookings.getPaymentStatus.useQuery(
    { bookingId: bookingId! },
    { enabled: !!bookingId, refetchInterval: 2000 }
  );

  const isPaid = paymentStatus?.status === "paid";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 container py-16">
        <div className="max-w-2xl mx-auto">
          {isLoading ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Confirming your payment...</p>
              </CardContent>
            </Card>
          ) : isPaid ? (
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Thank you for your reservation. Your Tesla rental has been confirmed and you will receive a confirmation email shortly.
                </p>
                
                <div className="bg-gray-100 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">What's Next?</h3>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Check Your Email</p>
                      <p className="text-sm text-muted-foreground">
                        We've sent a confirmation email with your booking details and pickup instructions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Pickup Day</p>
                      <p className="text-sm text-muted-foreground">
                        Arrive at our Chandler location at your scheduled pickup time. Bring your driver's license and the credit card used for booking.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Vehicle Orientation</p>
                      <p className="text-sm text-muted-foreground">
                        Our team will walk you through all Tesla features and answer any questions before you hit the road.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Questions?</p>
                      <p className="text-sm text-muted-foreground">
                        Call us at (602) 555-TESLA or email info@ifleet602.com
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button onClick={() => setLocation("/")} className="flex-1">
                    Return Home
                  </Button>
                  <Button variant="outline" onClick={() => setLocation("/fleet")} className="flex-1">
                    View Our Fleet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Processing your payment...</p>
                <p className="text-sm text-muted-foreground mt-2">This may take a moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
