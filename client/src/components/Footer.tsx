import { Link } from "wouter";
import { Zap, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">IFLEET602</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium Tesla rentals in Chandler, Arizona. Experience the future of driving today.
            </p>
          </div>

          {/* Rentals */}
          <div className="space-y-4">
            <h3 className="font-semibold">Rentals</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/fleet" className="hover:text-primary transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-primary transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Franchise */}
          <div className="space-y-4">
            <h3 className="font-semibold">Franchise</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/franchise" className="hover:text-primary transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/territory" className="hover:text-primary transition-colors">
                  Find Territory
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-primary transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Chandler, Arizona</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(602) 555-TESLA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@ifleet602.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IFLEET602. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
