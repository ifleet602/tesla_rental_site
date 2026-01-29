import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/book", label: "Book Now" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/franchise", label: "Franchise Opportunities" },
  { href: "/territory", label: "Find Your Territory" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">IFLEET602</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                className="text-sm"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/apply">
            <Button variant="outline" size="sm">
              Apply Now
            </Button>
          </Link>
          <Link href="/book">
            <Button size="sm">
              Book Your Tesla
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Main navigation links for IFLEET602</SheetDescription>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                    location === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4 flex flex-col gap-3">
                <Link href="/apply" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Apply Now
                  </Button>
                </Link>
                <Link href="/book" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">
                    Book Your Tesla
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
